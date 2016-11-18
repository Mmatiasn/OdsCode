using System;
using System.ComponentModel.DataAnnotations;

namespace OdsCode.ViewModels
{
    public class VideoViewModel
    {
        public string YtIds { get; set; }
        [Required]
        public string PlayListId { get; set; }
    }
}
