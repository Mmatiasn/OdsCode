using System;
using System.ComponentModel.DataAnnotations;

namespace OdsCode.ViewModels
{
    public class ContactViewModel
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 3)]
        public string Subject { get; set; }

        [Required]
        [StringLength(2000, MinimumLength = 10)]
        public string Message { get; set; }

        public DateTime EnteredOn { get; set; }
    }
}
