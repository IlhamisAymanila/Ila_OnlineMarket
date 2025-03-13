using System;
using API.Entities;

namespace API.Inserfaces;

public interface ITokenService
{
    public string CreateToken(AppUser appUser);
}
