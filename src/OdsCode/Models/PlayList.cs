using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json.Linq;

namespace OdsCode.Models
{
    public class PlayList
    {
        [Required]
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime DateCreated { get; set; }
        public string UserName { get; set; }
        public Video Videos { get; set; }
    }
}
