# Giai đoạn 1: Dùng SDK để build code
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /source

# Copy file .csproj và khôi phục các thư viện (Nuget packages)
COPY *.csproj .
RUN dotnet restore

# Copy toàn bộ code còn lại và tiến hành Publish ứng dụng
COPY . .
RUN dotnet publish -c Release -o /app --no-restore

# Giai đoạn 2: Tạo môi trường chạy ứng dụng gọn nhẹ
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app .

# Render tự động gán cổng qua biến môi trường PORT, cấu hình này để .NET nhận diện đúng cổng
ENV ASPNETCORE_URLS=http://+:8080
EXPOSE 8080

# Chạy ứng dụng
ENTRYPOINT ["dotnet", "PhilosophyAPI.dll"]
