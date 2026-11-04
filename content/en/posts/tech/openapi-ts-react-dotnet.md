---
title: "[OpenAPI] Exchanging Data Between TypeScript+React and ASP.NET Web API"
date: 2023-12-16T10:36:35+09:00
draft: false
tags: [OpenAPI, OpenAPI Generator, TypeScript, React, .NET, Web API, C#]
categories: [Tech]
show_date: true
toc: true
thumbnail: "https://res.cloudinary.com/takenoko/image/upload/v1709292863/NabeBlog/%E6%A7%8B%E6%88%90%E5%9B%B3_jawmcl.webp"
---

## Introduction

This is the article for day 24 of the [TypeScript Advent Calendar](https://qiita.com/advent-calendar/2023/typescript). Unfortunately, TypeScript content is only about 20% of it (sorry).

In this article, I walk through an example of exchanging data between a frontend built with TS + React and a backend built with ASP.NET, running in a local environment. I won't cover deployment targets or resource management approaches.

A realistic scenario might be something like: "We have an existing Web API server written in C# and want to build a new web app on top of it, but the frontend team only knows TS/JS." Rare, but it happens (or does it).

### End Result

As shown below, clicking a button sends a request, and the returned data is displayed as-is.

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1703506543/NabeBlog/try-movie_l0olvj.gif" alt="Prototype">}}

The architecture is simple[^1]:

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1709292863/NabeBlog/%E6%A7%8B%E6%88%90%E5%9B%B3_jawmcl.webp" alt="Architecture">}}

The actual code is available in the repository below (the development environment is also provided as a `devcontainer`):

{{<blogcard url="https://github.com/htnabe/OpenAPI-React-TypeScript-.NET-Example">}}

### Final Directory Structure

```
root
┣ /front
┃ ┗ /openAPI
┗ /webAPI
```

This project was set up on Windows 11 without using Docker. The folder containing the auto-generated interfaces is named `/openAPI`.

The directory structure here is informal, but if this were under Git, the `openAPI` folder would likely be introduced as a submodule. Running it as a monorepo is also an option — the right call depends on your team's situation (it's case-by-case).

## Steps

### Creating the Web API Project

Open any terminal where you can run the `dotnet` command — PowerShell, Command Prompt, whatever works. The following command creates an API with an endpoint like `localhost:1234/weatherForecast`. The output folder will be named `webapi`.

```
dotnet new webapi -o webapi
```

Looking at the generated `Program.cs`, you can see the `weatherForecast` API is auto-generated as follows. We'll use this endpoint as-is.

```
app.MapGet("/weatherforecast", () =>
{
  var forecast = Enumerable.Range(1, 5).Select(index =>
      new WeatherForecast
      (
          DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
          Random.Shared.Next(-20, 55),
          summaries[Random.Shared.Next(summaries.Length)]
      ))
      .ToArray();
  return forecast;
})
.WithName("GetWeatherForecast")
.WithOpenApi();

...省略

// NOTE: ご丁寧にrecordで定義してくれている
record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
  public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
```

:warning: If the NuGet package source is set to Microsoft Visual Studio Offline Packages, you'll get an error saying the package cannot be found. If that happens, run the following command to switch to the global online package source:[^2]

```
dotnet nuget add source https://api.nuget.org/v3/index.json -n nuget.org
```

### Generating the OpenAPI Schema File

In .NET Web API projects, `Swashbuckle` and `NSwag` are the main libraries used for auto-generating code and schema files. Both are covered in Microsoft's official documentation.

{{<blogcard url="https://learn.microsoft.com/ja-jp/aspnet/core/tutorials/getting-started-with-nswag?view=aspnetcore-8.0&tabs=visual-studio-code">}}

Here I'll use `NSwag`, which has become the more mainstream choice in recent years. Please refer to the documentation above for full details.

First, add `NSwag`:

```
dotnet add package NSwag.AspNetCore
```

Add the following incantation:

```
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApiDocument(); // ここを追加

... 省略

if (app.Environment.IsDevelopment())
{
    // Add OpenAPI 3.0 document serving middleware
    // Available at: http://localhost:<port>/swagger/v1/swagger.json
    app.UseOpenApi(); // ここを追加

    // Add web UIs to interact with the document
    // Available at: http://localhost:<port>/swagger
    app.UseSwaggerUi();  // ここを追加
}

```

To specify the server port number, edit `applicationUrl` in `Properties/launchSettings.json`. I set it to port 5200 for this example.

```
"applicationUrl": "http://localhost:5200",
```

With that, start the server with `dotnet run`. Navigating to `localhost:5200/swagger` should display the Swagger UI as shown below.
{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1707572633/NabeBlog/NSwag_swagger_page_gosykr.png" alt="Swagger UI" caption="Swagger UI">}}

If this doesn't work, refer to the article below:

- https://learn.microsoft.com/en-us/aspnet/core/tutorials/getting-started-with-swashbuckle?view=aspnetcore-8.0&tabs=visual-studio-code

Clicking on `/swagger/v1/swagger.json` shown in the diagram above lets you view the auto-generated JSON (the OpenAPI schema file). Save that JSON file.

### Automatically Generating the Schema File (WIP)

In .NET Core Web API projects, `NSwag.MSBuild` can be used to automatically generate the OpenAPI schema file during project builds. Following the approach described in the article below, you can auto-generate the schema file locally.

{{<blogcard url="https://blog.shibayan.jp/entry/20200519/1589877269">}}

`NSwag.MSBuild` documentation is [here](https://github.com/RicoSuter/NSwag/wiki/NSwag.MSBuild).

However, as of February 2024, the latest version of `NSwag.MSBuild` (`14.0.3`) has a CLI bug in .NET 8.0 environments (likely 7.0 as well) that prevents this feature from working (at least in my environment). I expect the fix will land in version `14.1` or later, and I'll update this article when that happens.

The details are tracked in the issue below:

{{<blogcard url="https://github.com/RicoSuter/NSwag/issues/4678">}}

### Creating the React App

Use `Vite` to quickly scaffold a working app. With `npm` available, create and verify the React app with the following commands. The folder is named `front`.

```
npm create vite@latest
cd front
npm install
npm run dev
```

Navigating to the app's URL should display the following screen:

{{<cldimg url="https://res.cloudinary.com/takenoko/image/upload/v1702995602/NabeBlog/%E5%8B%95%E4%BD%9C%E7%A2%BA%E8%AA%8D_bnbkqz.webp" alt="Confirmation of working" caption="Confirmation of working">}}

Once confirmed, blank out `App.tsx` in the `src` folder as shown below:

```
import "./App.css";

function App() {
  return <></>;
}

export default App;
```

### Auto-generating Code with OpenAPI Generator

I'll use [OpenAPI Generator](https://github.com/OpenAPITools/openapi-generator), one of the most established code generators available. Install it as a dev dependency:

```
npm install @openapitools/openapi-generator-cli -D
```

Create an `openapi` folder inside the `src` folder of `front` (the React project), then navigate into it:

```
cd ./front/src && mkdir openapi && cd openapi
```

Move the `swagger.json` you downloaded earlier into the `openapi` folder (any method works):

```
mv path/to/swagger.json ./
```

Inside the `openapi` folder, generate TypeScript + axios API request code from `swagger.json`:

```
npx @openapitools/openapi-generator-cli generate -i swagger.json -g typescript-axios
```

If successful, a few files will be generated. Only the TypeScript files matter for now — ignore the rest. Feeding the generated code to ChatGPT will give you a full explanation of how to use it, so I won't cover that here.

### Let's Send a Request!

I'll use the following function defined in `api.ts` to send a request:

```
export const DefaultApiFactory = function (configuration?: Configuration, basePath?: string, axios?: AxiosInstance) {
    const localVarFp = DefaultApiFp(configuration)
    return {
        /**
         *
         * @param {*} [options] Override http request option.
         * @throws {RequiredError}
         */
        getWeatherForecast(options?: any): AxiosPromise<Array<WeatherForecast>> {
            return localVarFp.getWeatherForecast(options).then((request) => request(axios, basePath));
        },
    };
};
```

Using this function, you can get a response with a call like:

```
const response = DefaultApiFactory().getWeatherForecast()
```

I also forgot to configure CORS on the API server side, so I added the following. Replace `アプリのポート番号` with the actual port number.

- For those unfamiliar with CORS, see [here](https://javascript.keicode.com/newjs/what-is-cors.php)
- For details on configuring CORS in ASP.NET Web API, see [here](https://learn.microsoft.com/ja-jp/aspnet/core/security/cors?view=aspnetcore-8.0)

```
// CORSの設定を追加
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
builder.Services.AddCors(options =>
{
  options.AddPolicy(name: MyAllowSpecificOrigins,
   policy =>
   {
     policy.WithOrigins("http://localhost:Reactアプリのポート番号").AllowAnyHeader().AllowAnyMethod();
   });
});

... 略

app.UseHttpsRedirection();

var summaries = new[]
{
    "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
};

// ここも必要
app.UseCors(MyAllowSpecificOrigins);
```

With that, here's the final code that sends a request and displays the data :tada:

```
// 最終的なフロント側のコード

import { useState } from "react";
import "./App.css";
import { DefaultApiFactory, WeatherForecast } from "./../openapi/api";

function App() {
  const [forecasts, setForecasts] = useState<WeatherForecast[]>([]);
  const fetchData = async () => {
    try {
      const response = await DefaultApiFactory().getWeatherForecast();
      setForecasts(response.data);
    } catch (error) {
      console.log(`Featching data failed. ${error}`);
    }
  };

  return (
    <>
      <button onClick={() => fetchData()}>リクエストするﾝｺﾞ～</button>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Temperature</th>
            <th>TemperatureF</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {forecasts.map((forecast, index) => {
            // なぜかforecast.Date等がundefinedになってしまう謎
            // 仕方なく各値を取り出している
            const [date, tempC, tempF, summary] = Object.values(forecast);
            return (
              <tr key={index}>
                <td>{date}</td>
                <td>{tempC}</td>
                <td>{tempF}</td>
                <td>{summary}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
```

~~I ran into a mystery where `forecast.data` and similar properties were coming back as `undefined`, so I worked around it with `Object.values`. Truly baffling. Someone please enlighten me.~~

- It turns out `System.Text.Json`, ASP.NET Core's default JSON serializer, was automatically converting property names to camelCase.
  - One way to work around this is to use Newtonsoft.Json's `PropertyName` attribute on the C# side to explicitly map properties to JSON keys (out of scope for this article).

Anyway, it works now.

## No Real Summary

- Ride on the shoulders of giants (OpenAPI Generator)
- I'm curious what code gets generated when the API server has token-based user authentication or request/response validation — something to explore next!

[^1]: Image sources: [here](https://commons.wikimedia.org/wiki/File:.NET_Core_Logo.svg) and [here](https://ja.m.wikipedia.org/wiki/%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB:React-icon.svg)

[^2]: Referenced from [here](https://learn.microsoft.com/ja-jp/dotnet/core/tools/dotnet-nuget-add-source) and [here](https://rksoftware.hatenablog.com/entry/2021/12/06/010852)
