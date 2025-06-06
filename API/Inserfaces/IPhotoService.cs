using System;
using CloudinaryDotNet.Actions;

namespace API.Inserfaces;

public interface IPhotoService
{
    Task<ImageUploadResult> AddPhotoAsync(IFormFile file);
    Task<DeletionResult> DeletePhotoAsync(string publicId);

}
