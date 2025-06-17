import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
// import { Strategy as FacebookStrategy } from "passport-facebook";
import config from "./config.js";
import { tokenTypes } from "./tokens.js";
import prisma from "../../prisma/index.js";

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error("Invalid token type");
    }
    const user = await prisma.user.findFirst({ where: { id: payload.sub } });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

// Google OAuth Strategy
const googleStrategy = new GoogleStrategy(
  {
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callbackURL,
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await prisma.user.findFirst({
        where: { email: profile.emails[0].value },
      });

      if (!user) {
        user = await prisma.user.create({
          data: {
            email: profile.emails[0].value,
            name: profile.displayName,
            photo: profile.photos[0].value,
            password: Math.random().toString(36).slice(-8), // Generate random password
            role: "user",
          },
        });
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
);

// Facebook OAuth Strategy
// const facebookStrategy = new FacebookStrategy(
//   {
//     clientID: config.facebook.clientId,
//     clientSecret: config.facebook.clientSecret,
//     callbackURL: config.facebook.callbackURL,
//     profileFields: ["id", "emails", "name", "picture.type(large)"],
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       let user = await prisma.user.findFirst({
//         where: { email: profile.emails[0].value },
//       });

//       if (!user) {
//         user = await prisma.user.create({
//           data: {
//             email: profile.emails[0].value,
//             name: `${profile.name.givenName} ${profile.name.familyName}`,
//             photo: profile.photos[0].value,
//             password: Math.random().toString(36).slice(-8), // Generate random password
//             role: "user",
//           },
//         });
//       }

//       return done(null, user);
//     } catch (error) {
//       return done(error, false);
//     }
//   }
// );

export {
  jwtStrategy,
  googleStrategy,
  // facebookStrategy,
};
