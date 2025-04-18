using HospitalWeb.Data;
using HospitalWeb.Repository;
using HospitalWeb.Models;
using Microsoft.EntityFrameworkCore;
using HospitalWeb.Services.AppointmentServices;
using HospitalWeb.Services.EmailServices;
using Microsoft.Extensions.Logging;
using HospitalWeb.Services;
using HospitalWeb.Services.LoginServices;
using HospitalWeb.Services.ReviewServices;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<HospitalContext>(options =>
    options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddTransient(typeof(IGenericRepository<>), typeof(GenericRepository<>));
builder.Services.AddScoped<IAppointmentServices, AppointmentServices>();
builder.Services.AddScoped<IEmailServices, EmailServices>();
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<IReviewService, ReviewService>();
builder.Services.AddMemoryCache();
builder.Services.AddControllers();
var allowedOrigins = builder.Configuration.GetSection("Cors:AllowedOrigins").Get<string[]>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.WithOrigins(allowedOrigins)
                 // builder.AllowAnyOrigin()
                 .AllowAnyHeader()
                .AllowAnyMethod()
             .AllowCredentials();
    });
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("AllowAll");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

