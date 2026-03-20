import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

// ✅ The Correct V3 Cloudinary Plugin
import { cloudinaryStorage } from 'payload-cloudinary';

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Products } from "./collections/Products"; 
import { Games } from "./collections/Games";
import { Posts } from "./collections/Posts"; 

import ForceDarkMode from './components/ForceDarkMode';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      // ✅ FIXED: Cast to 'any' to bypass strict React children typing
      providers: [ForceDarkMode as any], 
    },
  },
  // ✅ FIXED: Cast Posts to 'any' to resolve the collection configuration type mismatch
  collections: [Users, Media, Products, Games, Posts as any], 
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),
  sharp,
  plugins: [
    // ✅ Updated Cloudinary configuration for V3
    cloudinaryStorage({
      config: {
        // ✅ FIXED: Added || "" so TypeScript knows these will definitely be strings
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
        api_key: process.env.CLOUDINARY_API_KEY || "",
        api_secret: process.env.CLOUDINARY_API_SECRET || "",
      },
      collections: {
        media: true, // This enables it for your Media collection
      },
    }),
  ],
});