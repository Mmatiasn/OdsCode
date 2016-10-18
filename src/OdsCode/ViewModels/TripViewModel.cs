using OdsCode.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OdsCode.ViewModels
{
    public class TripViewModel
    {
        public string Id { get; private set; }
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public IEnumerable<Stop> Stops { get; set; }
    }
}
