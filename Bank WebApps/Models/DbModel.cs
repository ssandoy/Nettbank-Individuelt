using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;


namespace Bank_WebApps.Models
{
    public class DbModel : DbContext
    {
        public DbModel()
           : base("name=DbModel")
        {
            Database.CreateIfNotExists();
        }

        public DbSet<Customers> Customers { get; set; }
       // public DbSet<Loans> Loans { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }

    }

    public class Customers
    {
        [Key]
        public string PersonalNumber { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int loanAmount { get; set; }
        public int loanYears { get; set; }
        public decimal monthlyFee { get; set; }


        // TODO: LEGGE TIL LAANESOKNDAER I PERSON
    }

 /*   public class Loans
    {
        [Key]
        public string loanNumber { get; set; }
        public string PersonalNumber { get; set; }
        public int loanAmount { get; set; }
        public int monthlyAmount { get; set; } //TODO BEDRE NAVN
        public virtual Customers Owner { get; set; }


    }
    */
}