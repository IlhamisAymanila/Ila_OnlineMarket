using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.Entities;
using API.Inserfaces;
using Microsoft.IdentityModel.Tokens;

namespace API.Services;

public class TokenService(IConfiguration configuration) : ITokenService
{
    public string CreateToken(AppUser appUser)
    {
         var tokenKey = configuration["TokenKey"] ?? throw new Exception("Cannot access token");

         if(tokenKey.Length < 64) throw new ("Your tokenKey needs to be longer");

         var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

         var claims = new List<Claim>
         {
            new(ClaimTypes.NameIdentifier, appUser.UserName)
         };

         var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

         var tokenDescriptor = new SecurityTokenDescriptor
         {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = creds
         };

         var tokenHandler = new JwtSecurityTokenHandler();
         var token = tokenHandler.CreateToken(tokenDescriptor);

         return tokenHandler.WriteToken(token);
    }
}
