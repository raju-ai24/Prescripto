import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import doctorModel from './models/doctorModel.js';
import bcrypt from 'bcrypt';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY
});

const doctorsData = [
    {
        name: 'Dr. Richard James',
        email: 'doc1@example.com',
        image_path: '../frontend/src/assets/doc1.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Richard James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Emily Larson',
        email: 'doc2@example.com',
        image_path: '../frontend/src/assets/doc2.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily Larson has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Sarah Patel',
        email: 'doc3@example.com',
        image_path: '../frontend/src/assets/doc3.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Sarah Patel has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Christopher Lee',
        email: 'doc4@example.com',
        image_path: '../frontend/src/assets/doc4.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Christopher Lee has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Jennifer Garcia',
        email: 'doc5@example.com',
        image_path: '../frontend/src/assets/doc5.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Jennifer Garcia has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Andrew Williams',
        email: 'doc6@example.com',
        image_path: '../frontend/src/assets/doc6.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Andrew Williams has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Christopher Davis',
        email: 'doc7@example.com',
        image_path: '../frontend/src/assets/doc7.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Christopher Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Timothy White',
        email: 'doc8@example.com',
        image_path: '../frontend/src/assets/doc8.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Timothy White has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Ava Mitchell',
        email: 'doc9@example.com',
        image_path: '../frontend/src/assets/doc9.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Ava Mitchell has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Jeffrey King',
        email: 'doc10@example.com',
        image_path: '../frontend/src/assets/doc10.png',
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Jeffrey King has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '47th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Zoe Kelly',
        email: 'doc11@example.com',
        image_path: '../frontend/src/assets/doc11.png',
        speciality: 'Gastroenterologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Zoe Kelly has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Patrick Harris',
        email: 'doc12@example.com',
        image_path: '../frontend/src/assets/doc12.png',
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Patrick Harris has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '57th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Chloe Evans',
        email: 'doc13@example.com',
        image_path: '../frontend/src/assets/doc13.png',
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Chloe Evans has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '17th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Ryan Martinez',
        email: 'doc14@example.com',
        image_path: '../frontend/src/assets/doc14.png',
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Ryan Martinez has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: { line1: '27th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    },
    {
        name: 'Dr. Amelia Hill',
        email: 'doc15@example.com',
        image_path: '../frontend/src/assets/doc15.png',
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Year',
        about: 'Dr. Amelia Hill has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: { line1: '37th Cross, Richmond', line2: 'Circle, Ring Road, London' }
    }
];

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing doctors
        await doctorModel.deleteMany({});
        console.log('🗑️ Existing doctors cleared');

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('doctor123', salt);

        for (const [index, doc] of doctorsData.entries()) {
            console.log(`📎 Mapping local image for ${doc.name}...`);
            
            // Construct the local URL. e.g. http://localhost:4000/doctors/doc1.png
            const filename = path.basename(doc.image_path);
            const backendUrl = process.env.BACKEND_URL || "http://localhost:4000";
            const imageUrl = `${backendUrl}/doctors/${filename}`;

            try {
                const finalDoc = {
                    ...doc,
                    image: imageUrl,
                    password: hashedPassword,
                    date: Date.now(),
                    available: true
                };

                delete finalDoc.image_path;

                const newDoctor = new doctorModel(finalDoc);
                await newDoctor.save();
                console.log(`✅ ${doc.name} record saved to DB with local image.`);
            } catch (saveError) {
                console.error(`❌ Error saving ${doc.name} to DB:`, saveError.message);
            }
        }

        console.log('🚀 Seeding completed successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ General Error:', error);
        process.exit(1);
    }
};

seedDB();
