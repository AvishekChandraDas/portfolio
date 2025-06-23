import React from 'react'
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

import { styles } from '../styles';
import { RocketCanvas } from './canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Contact = () => {

  const formRef = useRef();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.send('service_sattu7l', 
      'template_d6c8z4r', 
      {
        from_name: form.name,
        from_email: form.email,
        message: form.message
      }, '-mipPSEJJ1Cs93q8y'
    )
    .then(() => {
      setLoading(false);
      alert("Thank you! Your message has been sent.");
      setForm({ name: "", email: "", message: "" });
    }, (error) => {
      setLoading(false);
      console.log(error);
      alert("An error occurred. Please try again."); 
    })

  }

  return (
    <div className='xl:mt-12 xl:flex-row flec-col-reverse flex gap-10 overflow-hidden'>
      <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.75] bg-black-100 p-8 rounded-2xl">

        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your name</span>
            <input type="text" 
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Who are you?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg text-white outlined-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your email</span>
            <input type="text" 
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="What's your email?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg text-white outlined-none border-none font-medium'
            />
          </label>
          <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Your message</span>
            <textarea rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="What do you want to say?"
              className='bg-tertiary py-4 px-6 placeholder:text-secondary rounded-lg text-white outlined-none border-none font-medium'
            />
          </label>

          <button type="submit" className='bg-tertiary text-[18px] py-3 px-8 w-fit text-white font-bold shadow-md shadow-primary rounded-xl'>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px] sm:w-full sm:flex-1'
      >
        <RocketCanvas />
      </motion.div>
    </div>
  )
}


export default SectionWrapper(Contact, "contact");