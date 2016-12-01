using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using System.Web.Script.Serialization;
using Bank_WebApps.Models;

namespace Bank_WebApps.Controllers
{
    public class CustomerController : ApiController
    {

        DbAccess AccessDb = new DbAccess();

        // GET api/<controller>
        public HttpResponseMessage Get()
        {
            List<ViewModel.Customer> allCustomers = AccessDb.getCustomers();

            var Json = new JavaScriptSerializer();
            string JsonString = Json.Serialize(allCustomers);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }

        // GET api/<controller>/5
        public HttpResponseMessage Get(string id)
        {
            ViewModel.Customer customer = AccessDb.getCustomer(id);

            var Json = new JavaScriptSerializer();
            string JsonString = Json.Serialize(customer);

            return new HttpResponseMessage()
            {
                Content = new StringContent(JsonString, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK
            };
        }

        // POST api/Customer
        [HttpPost]
        public HttpResponseMessage Post([FromBody]ViewModel.Customer CustomerIn)
        {

            if (ModelState.IsValid)
            {
                bool OK = AccessDb.saveCustomer(CustomerIn);
                if (OK)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };

                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.BadRequest,
                Content = new StringContent("Kunne ikke sette inn kunden i DB")
            };
        }



        // PUT api/Customer/5
        public HttpResponseMessage Put(string id, [FromBody]ViewModel.Customer customer)
        {
            if (ModelState.IsValid)
            {
                bool OK = AccessDb.changeCustomer(id, customer);
                if (OK)
                {
                    return new HttpResponseMessage()
                    {
                        StatusCode = HttpStatusCode.OK
                    };
                }
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.NotFound,
                Content = new StringContent("Kunne ikke endre kunden i DB")
            };

        }

        // DELETE api/Customer/5
        public HttpResponseMessage Delete(string id)
        {
            bool OK = AccessDb.deleteCustomer(id);
            if (!OK)
            {
                return new HttpResponseMessage()
                {
                    StatusCode = HttpStatusCode.NotFound,
                    Content = new StringContent("Kunne ikke slette kunden i DB")
                };
            }
            return new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}