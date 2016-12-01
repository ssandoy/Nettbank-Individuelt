using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Bank_WebApps.Controllers
{
    public class LoanController : ApiController
    {
        // GET: api/Loan
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Loan/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Loan
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Loan/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Loan/5
        public void Delete(int id)
        {
        }
    }
}
