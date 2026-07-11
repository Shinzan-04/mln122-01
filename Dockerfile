# Giai đoạn 1: Dùng SDK để build code
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy file .csproj và khôi phục các thư viện (Nuget packages)
COPY BE/*.csproj ./BE/
RUN dotnet restore BE/PhilosophyAPI.csproj

# Copy toàn bộ code còn lại và tiến hành Publish ứng dụng
COPY BE/ ./BE/
RUN dotnet publish BE/PhilosophyAPI.csproj -c Release -o /app --no-restore

# Giai đoạn 2: Tạo môi trường chạy ứng dụng gọn nhẹ
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Render tự động gán cổng qua biến môi trường PORT
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["dotnet", "PhilosophyAPI.dll"]
