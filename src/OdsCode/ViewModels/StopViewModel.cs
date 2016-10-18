using System;
using System.ComponentModel.DataAnnotations;

namespace OdsCode.ViewModels
{
    public class StopViewModel
    {
        public int Id { get; private set; }

        [Required]
        [StringLength(100, MinimumLength =2)]
        public string Name { get; set; }
        
        [Required]
        public DateTime StopDate { get; set; }
    }
}
