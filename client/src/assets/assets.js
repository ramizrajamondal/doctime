import appointment_img from './appointment_img.png'
import header_img from './header_img.png'
import group_profiles from './group_profiles.png'
import profile_pic from './profile_pic.png'
import contact_image from './contact_image.png'
import about_image from './about_image.png'
import doctimelogo from "./doctime_logo.png"
import dropdown_icon from './dropdown_icon.svg'
import menu_icon from './menu_icon.svg'
import cross_icon from './cross_icon.png'
import chats_icon from './chats_icon.svg'
import verified_icon from './verified_icon.svg'
import arrow_icon from './arrow_icon.svg'
import info_icon from './info_icon.svg'
import upload_icon from './upload_icon.png'
import stripe_logo from './stripe_logo.png'
import razorpay_logo from './razorpay_logo.png'
import doc1 from './doc1.png'
import doc2 from './doc2.png'
import doc3 from './doc3.png'
import doc4 from './doc4.png'
import doc5 from './doc5.png'
import doc6 from './doc6.png'
import doc7 from './doc7.png'
import doc8 from './doc8.png'
import doc9 from './doc9.png'
import doc10 from './doc10.png'
import doc11 from './doc11.png'
import doc12 from './doc12.png'
import doc13 from './doc13.png'
import doc14 from './doc14.png'
import doc15 from './doc15.png'
import Dermatologist from './Dermatologist.svg'
import Gastroenterologist from './Gastroenterologist.svg'
import General_physician from './General_physician.svg'
import Gynecologist from './Gynecologist.svg'
import Neurologist from './Neurologist.svg'
import Pediatricians from './Pediatricians.svg'


export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo,
    doctimelogo
}

export const specialityData = [
    {
        speciality: 'General physician',
        image: General_physician
    },
    {
        speciality: 'Gynecologist',
        image: Gynecologist
    },
    {
        speciality: 'Dermatologist',
        image: Dermatologist
    },
    {
        speciality: 'Pediatricians',
        image: Pediatricians
    },
    {
        speciality: 'Neurologist',
        image: Neurologist
    },
    {
        speciality: 'Gastroenterologist',
        image: Gastroenterologist
    },
]

export const doctors = [
    {
        _id: 'doc1',
        name: 'Dr. Richard James',
        image: doc1,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. James has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 50,
        address: {
            line1: '17th Cross, Delhi',
            line2: 'Circle, Ring Road, Delhi'
        }
    },
    {
        _id: 'doc2',
        name: 'Dr. Emily Gupta',
        image: doc2,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Emily has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 60,
        address: {
            line1: '27th Cross, Mumbai',
            line2: 'Circle, Ring Road, Mumbai'
        }
    },
    {
        _id: 'doc3',
        name: 'Dr. Sarah Patel',
        image: doc3,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Sarah has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 30,
        address: {
            line1: '37th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc4',
        name: 'Dr. Christopher Lee',
        image: doc4,
        speciality: 'Pediatricians',
        degree: 'MBBS,MD',
        experience: '2 Years',
        about: 'Dr. Christopher has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies. Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.',
        fees: 40,
        address: {
            line1: '47th Cross, Richmond',
            line2: 'Circle, Ring Road, London'
        }
    },
    {
        _id: 'doc5',
        name: 'Dr. Priya Sharma',
        image: doc5,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Priya Sharma specializes in diagnosing and treating disorders related to the brain, spine, and nervous system. She focuses on migraine management, epilepsy treatment, and neurological rehabilitation with compassionate patient care.',
        fees: 800,
        address: {
            line1: '22 Park Street Kolkata',
            line2: 'Kolkata, West Bengal'
        }
    },
    {
        _id: 'doc6',
        name: 'Dr. Arjun Mehta',
        image: doc6,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Arjun Mehta provides advanced neurological care for conditions such as stroke, nerve disorders, and chronic headaches. He believes in accurate diagnosis and personalized treatment plans for every patient.',
        fees: 900,
        address: {
            line1: '14 MG Road Bengaluru',
            line2: 'Bengaluru, Karnataka'
        }
    },
    {
        _id: 'doc7',
        name: 'Dr. Rahul Verma',
        image: doc7,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rahul Verma offers comprehensive healthcare services including routine checkups, fever treatment, diabetes management, and preventive healthcare for patients of all age groups.',
        fees: 600,
        address: {
            line1: '45 Civil Lines Lucknow',
            line2: 'Lucknow, Uttar Pradesh'
        }
    },
    {
        _id: 'doc8',
        name: 'Dr. Sneha Iyer',
        image: doc8,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Sneha Iyer specializes in women’s health, pregnancy care, menstrual disorders, and fertility consultations. She is dedicated to providing safe and comfortable treatment for women.',
        fees: 1000,
        address: {
            line1: '18 Anna Nagar Chennai',
            line2: 'Chennai, Tamil Nadu'
        }
    },
    {
        _id: 'doc9',
        name: 'Dr. Kavya Reddy',
        image: doc9,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Kavya Reddy provides treatment for acne, skin allergies, pigmentation, and hair-related concerns. She focuses on healthy skin care with modern dermatological solutions.',
        fees: 700,
        address: {
            line1: '9 Jubilee Hills Hyderabad',
            line2: 'Hyderabad, Telangana'
        }
    },
    {
        _id: 'doc10',
        name: 'Dr. Aman Kapoor',
        image: doc10,
        speciality: 'Pediatricians',
        degree: 'MBBS',
        experience: '2 Years',
        about: 'Dr. Aman Kapoor specializes in child healthcare, vaccinations, nutrition guidance, and treatment for common childhood illnesses. He ensures friendly and attentive care for children.',
        fees: 750,
        address: {
            line1: '31 Sector 22 Chandigarh',
            line2: 'Chandigarh, Punjab'
        }
    },
    {
        _id: 'doc11',
        name: 'Dr. Neha Joshi',
        image: doc11,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Neha Joshi is experienced in treating neurological conditions including Parkinson’s disease, epilepsy, and sleep disorders with evidence-based treatment methods.',
        fees: 850,
        address: {
            line1: '12 FC Road Pune',
            line2: 'Pune, Maharashtra'
        }
    },
    {
        _id: 'doc12',
        name: 'Dr. Rohan Malhotra',
        image: doc12,
        speciality: 'Neurologist',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Rohan Malhotra focuses on advanced neurological care and early diagnosis of nervous system disorders. He aims to improve patient recovery through modern medical practices.',
        fees: 950,
        address: {
            line1: '67 Rajouri Garden New Delhi',
            line2: 'New Delhi, Delhi'
        }
    },
    {
        _id: 'doc13',
        name: 'Dr. Pooja Desai',
        image: doc13,
        speciality: 'General physician',
        degree: 'MBBS',
        experience: '4 Years',
        about: 'Dr. Pooja Desai provides primary healthcare services including treatment for infections, blood pressure management, and lifestyle-related diseases with patient-focused care.',
        fees: 650,
        address: {
            line1: '20 SG Highway Ahmedabad',
            line2: 'Ahmedabad, Gujarat'
        }
    },
    {
        _id: 'doc14',
        name: 'Dr. Anjali Nair',
        image: doc14,
        speciality: 'Gynecologist',
        degree: 'MBBS',
        experience: '3 Years',
        about: 'Dr. Anjali Nair offers expert consultation in pregnancy care, women’s wellness, hormonal issues, and reproductive health with a compassionate approach.',
        fees: 1100,
        address: {
            line1: '5 Marine Drive Kochi',
            line2: 'Kochi, Kerala'
        }
    },
    {
        _id: 'doc15',
        name: 'Dr. Ishita Banerjee',
        image: doc15,
        speciality: 'Dermatologist',
        degree: 'MBBS',
        experience: '1 Years',
        about: 'Dr. Ishita Banerjee specializes in skincare treatments, acne solutions, anti-pigmentation therapies, and hair fall management using advanced dermatology techniques.',
        fees: 700,
        address: {
            line1: '11 Salt Lake Sector V Kolkata',
            line2: 'Kolkata, West Bengal'
        }
    }

]