using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.IO;
using WebAPIDonation.Models;

namespace WebAPIDonation.Data
{
    public class DonationDBContext : DbContext
    {
        public DonationDBContext(DbContextOptions<DonationDBContext> options) : base(options)
        {

        }

        public DbSet<DCandidate> DCandidates { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            IConfiguration configuration = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", false, true)
                .Build();

            optionsBuilder.UseSqlServer(configuration.GetConnectionString("DataBase"));
        }
    }
}
