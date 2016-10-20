using OdsCode.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace OdsCode.ViewModels
{
    public class PlayListViewModel
    {
        public string Id { get; private set; }
        [Required]
        [StringLength(100, MinimumLength = 2)]
        public string Name { get; set; }
        public DateTime DateCreated { get; set; } = DateTime.UtcNow;
        public IEnumerable<Video> Videos { get; set; }
    }
}
