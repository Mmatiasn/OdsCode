using OdsCode.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OdsCode.ViewModels
{
    public class PlayListViewModel
    {
        public int Id { get; set; }
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public Video Videos { get; set; }
    }
}
