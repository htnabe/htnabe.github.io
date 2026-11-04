---
title: "Running ASP.NET Core Web API on AWS Lambda Without the Stress"
date: 2025-11-22T05:51:30Z
draft: true
show_date: true
toc: true
tags: [C#, ASP.NET Core, Web API, AWS, Lambda]
categories: [Tech]
thumbnail: ""
---

## Introduction

- Target audience
  - Developers who want to build a Web API with C# on a serverless architecture
  - Developers who are tired of failed Lambda function deployments and integration tests
- Summary
  - ASP.NET Core Web API can run on AWS Lambda
  - No need to refactor for Lambda — you can write the API the same way you would for a normal web server

Being able to handle both API Gateway routing and function logic in one place when implementing Lambda functions is really appealing (personal opinion)!

There are official docs and articles on running a C# Web API on AWS Lambda, but I decided to write this up after experimenting with it myself.

Reference:

{{<blogcard url="https://docs.aws.amazon.com/ja_jp/lambda/latest/dg/lambda-csharp.html">}}

At the moment, I see the following options for starting an ASP.NET application that runs on Lambda (there may be others):

- Start with an ASP.NET Core Web API server app and deploy with Lambda Web Adapter
  - Despite container size and execution time limits, this looks like the easiest option
    - I haven't actually operated it in production, so I can't speak to the downsides
- Start with `dotnet new lambda.EmptyFunction`
  - Nothing special to say here
- Start with `dotnet new serverless.AspNetCoreWebAPI` :point_left: This is what I tried this time
  - This seems like the best option when building a server that only accepts requests from specific applications

## Core Concepts of Running a Web API on AWS Lambda

- How Web APIs run on Lambda
- The role of Lambda Web Adapter
- How to connect an ASP.NET Core application to Lambda

## Setting Up the Development Environment

- Installing the .NET SDK
- Configuring Visual Studio or VS Code
- Preparing the AWS CLI and AWS Toolkit

## Creating the ASP.NET Core Web API Project

- Generating the project with `dotnet new webapi`
- Adding required packages
- Introducing and configuring the Web Adapter

## Building and Packaging for Lambda

- Build steps targeting Lambda
- Key configuration files and project changes
- Creating the deployment archive

## Deployment and Verification

- Deploying via AWS CLI or AWS Management Console
- Configuring API Gateway integration
- Verifying behavior with HTTP requests via Postman or similar
- Reviewing logs in CloudWatch Logs

## Operations & Tips

- Troubleshooting after deployment
- Performance improvement tips
- Version management and staging on Lambda

## Summary

- A summary of the basic steps to run a C# Web API on AWS Lambda
- Next steps: considering production deployment and CI/CD automation
