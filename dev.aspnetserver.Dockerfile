FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /source

# copy csproj and restore as distinct layers
COPY AspNetServer/*.csproj .
RUN dotnet restore

# copy and publish app and libraries
COPY AspNetServer/. .
RUN dotnet publish --no-restore -o /app


# final stage/image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
EXPOSE 7094
WORKDIR /app
COPY --from=build /app .
USER $APP_UID
ENTRYPOINT ["./AspNetServer"]
