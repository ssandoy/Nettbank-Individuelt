using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bank_WebApps.Models
{
    public class DomainModel
    {
    
        public class Customer
        {
            [RegularExpression(@"[0-9]{11}", ErrorMessage = "Personnummeret må være på 11 siffer.")]
            public string PersonalNumber { get; set; }

            [Required]
            public string FirstName { get; set; }

            [Required]
            public string LastName { get; set; }

            [Required]
            [RegularExpression(@"[0-9]{8}")]
            public string PhoneNumber { get; set; }

            [Required]
            [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
            public string Email { get; set; }

            [Required]
            [RegularExpression("^[0-9]{1,7}$")]
            public int loanAmount { get; set; }
            [Required]
            [RegularExpression("^[0-9]{1,2}$")]
            public int loanYears { get; set; }
            public decimal monthlyFee { get; set; }

        }




    }
}