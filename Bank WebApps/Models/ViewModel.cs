using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Bank_WebApps.Models
{
    public class ViewModel
    {
        //For use in regKunde spmtegn
        public class Customer
        {
          /*  [Required(ErrorMessage = "Personnummer må oppgis.")]
            [RegularExpression(@"[0-9]{11}", ErrorMessage = "Personnummeret må være på 11 siffer.")]*/
            public string PersonalNumber { get; set; }

           /* [DisplayName("Fornavn")]
            [Required(ErrorMessage = "Fornavn må oppgis.")]*/
            public string FirstName { get; set; }

           /* [DisplayName("Etternavn")]
            [Required(ErrorMessage = "Etternavn må oppgis.")]*/
            public string LastName { get; set; }

         /*   [DisplayName("Telefonnummer")]
            [Required(ErrorMessage = "Telefonnummer må oppgis.")]
            [RegularExpression(@"[0-9]{8}", ErrorMessage = "Telefonnummeret må være på 8 siffer.")]*/
            public string PhoneNumber { get; set; }

           /* [DisplayName("Mail")]
            [Required(ErrorMessage = "Mail må oppgis.")]
            [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$", ErrorMessage = "Mail må være i riktig format")]*/
            public string Email { get; set; }

            public int loanAmount { get; set; }
            public int loanYears { get; set; }
            public decimal monthlyFee { get; set; }

        }




    }
}