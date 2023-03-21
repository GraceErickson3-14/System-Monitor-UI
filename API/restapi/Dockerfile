#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.


# With multi-stage builds, you use multiple FROM statements in your Dockerfile. Each FROM instruction can use a different base,
# and each of them begins a new stage of the build
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

#a different stage
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["restapi/restapi.csproj", "restapi/"]
RUN dotnet restore "restapi/restapi.csproj"
COPY . .
WORKDIR "/src/restapi"
RUN dotnet build "restapi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "restapi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "restapi.dll"]