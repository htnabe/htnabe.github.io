---
title: "CLI Library Development Notes"
date: 2025-11-16T13:20:32Z
draft: false
show_date: true
toc: true
tags: [CLI, Scrap]
categories: [Tech]
thumbnail: ""
---

## 2025-11-16

### Adding Commit Signatures

Like a "made by me" label on produce, this is about proving authorship.

Initially I tried to create a GPG key inside a `devcontainer`, but ran into errors. After looking into it, I found there were some workarounds involving some black magic, but it felt like too much effort, so I switched to using SSH for signing instead.

I referenced the article below.

{{<blogcard url="https://qiita.com/haw_ohnuma/articles/51fa84449bc4a1393846">}}

The process is similar to registering an SSH public key for `Authentication` (to connect from local to GitHub via SSH) — except this time you register the public key under `Signing-key`.

Some local-side configuration is also needed; refer to the article above for details.

### Setting Up Automatic Publishing with GitHub Actions

I've been quietly developing [algolia-uploader](https://github.com/htnabe/algolia-uploader), and I finally got around to configuring GitHub Actions to automatically run `npm publish` when a new tag is created.

- The key file: [publish.yml](https://github.com/htnabe/algolia-uploader/blob/main/.github/workflows/publish.yml)

First, I got stuck trying to generate a token from the npmjs GUI.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1763301281/tech/npmjs-gui_ikaoja.webp" alt="npmjs-gui">}}

The descriptions for `Packages and scopes` and `Bypass 2FA` left me completely lost.

After a bit of research, the explanation in the article below should tell you how to fill in each option.

{{<blogcard url="https://zenn.dev/wakamsha/articles/about-publishing-node-packages#npm-access-token-%E3%81%AE%E7%99%BA%E8%A1%8C%E6%89%8B%E9%A0%86">}}

That was resolved, but just setting `NPM_TOKEN` produced the following error:

```plaintext
npm error 403 403 Forbidden - PUT https://registry.npmjs.org/algolia-uploader - Two-factor authentication is required to publish this package but an automation token was specified
npm error 403 In most cases, you or one of your dependencies are requesting
npm error 403 a package version that is forbidden by your security policy, or
npm error 403 on a server you do not have access to.
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2025-11-16T04_29_06_002Z-debug-0.log
```

While investigating the cause, I discovered something called npmjs's `Trusted Publisher`. It seems like a recent response to npm supply-chain attacks, maybe? Not sure.

{{<blogcard url="https://docs.npmjs.com/trusted-publishers">}}

I also read the official GitHub docs.

{{<blogcard url="https://docs.github.com/ja/actions/tutorials/publish-packages/publish-nodejs-packages">}}

First, I added the following:

```yml
name: Publish Package to npmjs
on:
  release:
    types: [published]
jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write # <- ここが大事
```

Also, some error occurs if `repository.url` is not set in `package.json`:

```plaintext
npm error code E422
npm error 422 Unprocessable Entity - PUT https://registry.npmjs.org/algolia-uploader - Error verifying sigstore provenance bundle: Failed to validate repository information: package.json: "repository.url" is "", expected to match "https://github.com/htnabe/algolia-uploader" from provenance
npm error A complete log of this run can be found in: /home/runner/.npm/_logs/2025-11-16T08_24_40_553Z-debug-0.log
```

Adding the URL to `package.json` as shown below resolved the error:

```json
  "repository": {
    "type": "git",
    "url": "https://github.com/octocat/my-other-repo.git"
  },
```

It seems the `.git` suffix at the end of the URL is required (or at least recommended). It's also apparently needed to display `provenance` (origin traceability), which is another mechanism for ensuring package safety.

My workflow is now as follows:

1. Make local changes
1. Run a command like `npm version patch` to bump the version in `package.json` and create a tag at the same time
1. Push the tag to the remote
1. The npm package publish action fires
1. Verify the specified version and check for vulnerable dependencies, then publish

### Removing Old Package Versions

As described in the [official documentation](https://docs.npmjs.com/policies/unpublish), `npm unpublish` can be used to delete a package within 72 hours of publishing.

Even after 72 hours, deletion is possible under certain conditions.

Alternatively, you can mark a package version as deprecated to display a warning with:

`npm deprecate <package>@<version> "<message>"`

With that, automatic publishing is now fully implemented.
