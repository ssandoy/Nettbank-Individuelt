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

        public decimal calculateMonthlyFee(int G, int n)
        {
            var r = 0.07;
            var y = (r * G) / (1 - Math.Pow(1 + r, -n));
            return (decimal) y/12;
        }

        public List<DomainModel.Customer> getCustomers()
        {
            List<DomainModel.Customer> customers = db.Customers.Select(k => new DomainModel.Customer()
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

        public bool saveCustomer(DomainModel.Customer customer)
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
                monthlyFee = calculateMonthlyFee(customer.loanAmount, customer.loanYears)
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

        public bool changeCustomer(string id, DomainModel.Customer customer)
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
            customers.monthlyFee = customer.monthlyFee;
            customers.loanAmount = customer.loanAmount;
            customers.loanYears = customer.loanYears;
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

        public DomainModel.Customer getCustomer(string id)
        {
            Customers dbCustomers = db.Customers.Find(id);

            var enKunde = new DomainModel.Customer()
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