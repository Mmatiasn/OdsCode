﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using OdsCode.Repository;

namespace OdsCode.Migrations
{
    [DbContext(typeof(WorldContext))]
    [Migration("20160925232233_InitialDatabase")]
    partial class InitialDatabase
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("OdsCode.Models.Stop", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Arrival");

                    b.Property<double>("Latitude");

                    b.Property<double>("Longitude");

                    b.Property<string>("Name");

                    b.Property<int>("Order");

                    b.Property<int?>("TripId");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.HasIndex("TripId");

                    b.ToTable("Stops");
                });

            modelBuilder.Entity("OdsCode.Models.Trip", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Name");

                    b.Property<string>("UserName");

                    b.HasKey("Id");

                    b.ToTable("Trips");
                });

            modelBuilder.Entity("OdsCode.Models.Stop", b =>
                {
                    b.HasOne("OdsCode.Models.Trip")
                        .WithMany("Stops")
                        .HasForeignKey("TripId");
                });
        }
    }
}
