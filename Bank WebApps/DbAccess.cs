using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Bank_WebApps.Models;

namespace Bank_WebApps.Models
{
    public class DbAccess
    {
        DbModel db = new DbModel();

        public List<ViewModel.Customer> getCustomers()
        {
            List<ViewModel.Customer> customers = db.Customers.Select(k => new ViewModel.Customer()
            {
                PersonalNumber = k.PersonalNumber,
                FirstName = k.FirstName,
                LastName = k.LastName,
                PhoneNumber = k.PhoneNumber,
                Email = k.Email,
                loanAmount = k.loanAmount,
                loanYears = k.loanYears,
                monthlyFee = k.monthlyFee
            }).ToList();
            return customers;
        }

        public bool saveCustomer(ViewModel.Customer customer)
        {
            var newCustomer = new Customers
            {
                PersonalNumber = customer.PersonalNumber,
                FirstName = customer.FirstName,
                LastName = customer.LastName,
                PhoneNumber = customer.PhoneNumber,
                Email = customer.Email,
                loanAmount = customer.loanAmount,
                loanYears = customer.loanYears,
                monthlyFee = customer.monthlyFee
            };

            
            try
            {
                // lagre kunden
                db.Customers.Add(newCustomer);
                db.SaveChanges();
            }
            catch (Exception feil)
            {
                return false;
            }
            return true;


        }

        public bool deleteCustomer(string id)
        {
            try
            {
                Customers customer = db.Customers.Find(id);
                db.Customers.Remove(customer);
                db.SaveChanges();
            }
            catch (Exception feil)
            {
                return false;
            }
            return true;
        }

        public bool changeCustomer(string id, ViewModel.Customer customer)
        {
            // finn kunden
            Customers customers = db.Customers.FirstOrDefault(k => k.PersonalNumber == id);
            if (customers == null)
            {
                return false;
            }
            // legg inn ny verdier i denne fra innKunde
            customers.FirstName = customer.FirstName;
            customers.LastName = customer.LastName;
            customers.PhoneNumber = customer.PhoneNumber;
            customers.Email = customer.Email;
            try
            {
                // lagre kunden
                db.SaveChanges();
            }
            catch (Exception feil)
            {
                return false;
            }
            return true;
        }

        public ViewModel.Customer getCustomer(string id)
        {
            Customers dbCustomers = db.Customers.Find(id);

            var enKunde = new ViewModel.Customer()
            {
                PersonalNumber = dbCustomers.PersonalNumber,
                FirstName = dbCustomers.FirstName,
                LastName = dbCustomers.LastName,
                PhoneNumber = dbCustomers.PhoneNumber,
                Email = dbCustomers.Email,
                loanAmount = dbCustomers.loanAmount,
                loanYears = dbCustomers.loanYears,
                monthlyFee = dbCustomers.monthlyFee
            };
            return enKunde;
        }
    }
}