using System;
using System.Collections.Generic;
using HospitalWeb.Models;
using Microsoft.EntityFrameworkCore;

namespace HospitalWeb.Data;

public partial class HospitalContext : DbContext
{
    private readonly IConfiguration _configuration;
    public HospitalContext()
    {
    }

    public HospitalContext(DbContextOptions<HospitalContext> options, IConfiguration configuration)
        : base(options)
    {
        _configuration = configuration;
    }

    public virtual DbSet<Hospitaldetail> Hospitaldetails { get; set; }
    public virtual DbSet<Review> Reviews { get; set; }

    public virtual DbSet<User> Users { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        try
        {
            if (!optionsBuilder.IsConfigured)
            {
                // Get the connection string from the configuration
                var connectionString = _configuration.GetConnectionString("DefaultConnection");

                // Use the connection string
                optionsBuilder.UseSqlServer(connectionString);

            }
        }
        catch (Exception ex)
        {
            throw;
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Hospitaldetail>(entity =>
        {
            entity.ToTable("hospitaldetails");

            entity.Property(e => e.AvailableTime).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Date).HasColumnType("datetime");
            entity.Property(e => e.Gender).HasMaxLength(10);
            entity.Property(e => e.PatientName).HasMaxLength(50);
            entity.Property(e => e.PhoneNumber).HasMaxLength(30);
            entity.Property(e => e.Reason).HasMaxLength(250);
            entity.Property(e => e.RequestStatus).HasMaxLength(20);
        });

        modelBuilder.Entity<Review>(entity =>
        {
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasMaxLength(150);
            entity.Property(e => e.Name).HasMaxLength(100);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.ToTable("User");

            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.Name).HasMaxLength(50);
            entity.Property(e => e.Password).HasMaxLength(250);
            entity.Property(e => e.PhoneNumber).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }




    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
