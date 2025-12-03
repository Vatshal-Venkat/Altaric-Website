import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';
import { Calendar, Clock, Phone, Mail, MapPin, Send, Building } from 'lucide-react';

const ContactFormContainer = styled.section`
  padding: 8rem 2rem;
  background: linear-gradient(135deg, #FFE4B5 0%, #fffbe6 100%);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 4rem 1rem;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
`;

const SectionHeader = styled(motion.div)`
  text-align: center;
  margin-bottom: 6rem;

  @media (max-width: 768px) {
    margin-bottom: 4rem;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
`;

const SectionSubtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.6;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FormContainer = styled(motion.div)`
  background: #fff;
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: 20px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(255, 140, 0, 0.1);
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 2rem;
  color: #333;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  background: #fff;
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: 10px;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #FF8C00;
    box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 1rem;
  background: #fff;
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: 10px;
  color: #333;
  font-size: 1rem;
  transition: all 0.3s ease;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #FF8C00;
    box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  background: #fff;
  border: 1px solid rgba(255, 140, 0, 0.3);
  border-radius: 10px;
  color: #333;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s ease;
  font-family: inherit;

  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #FF8C00;
    box-shadow: 0 0 0 3px rgba(255, 140, 0, 0.1);
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  background: linear-gradient(45deg, #FF8C00, #FFA500);
  color: #fff;
  border: none;
  padding: 1.2rem;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 140, 0, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(255, 140, 0, 0.4);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ContactInfo = styled(motion.div)`
  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 2rem;
    color: #333;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #fff;
  border: 1px solid rgba(255, 140, 0, 0.2);
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(255, 140, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(255, 140, 0, 0.4);
    box-shadow: 0 4px 15px rgba(255, 140, 0, 0.2);
  }
`;

const ContactIcon = styled.div`
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, #FF8C00, #FFA500);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
`;

const ContactText = styled.div`
  h4 {
    font-size: 1.1rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 0.9rem;
  }
`;

const ContactForm = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  // ✅ match backend schema
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    project_details: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8000/meetings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // ✅ send to FastAPI
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      const data = await response.json();
      alert("✅ Meeting scheduled successfully!");

      // reset form
      setFormData({
        full_name: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        project_details: "",
      });
    } catch (error) {
      alert("❌ Error: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContactFormContainer ref={containerRef} id="contact">
      <ContentWrapper>
        <SectionHeader
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <SectionTitle>Schedule a Call</SectionTitle>
          <SectionSubtitle>
            Ready to transform your business with AI? Let's discuss how we can help you achieve your goals.
          </SectionSubtitle>
        </SectionHeader>

        <FormGrid>
          <FormContainer
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="interactive"
          >
            <FormTitle>
              <Calendar size={24} />
              Schedule a Meeting
            </FormTitle>

            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="full_name">Full Name *</Label>
                <Input
                  type="text"
                  id="full_name"
                  name="full_name"
                  value={formData.full_name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="company">Company</Label>
                <Input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Enter your company name"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                />
              </FormGroup>

              <FormGroup>
                <Label htmlFor="service">Select a Service</Label>
                <Select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                >
                  <option value="">Choose a service...</option>
                  <option value="ai-consultation">AI Consultation</option>
                  <option value="custom-development">Custom Development</option>
                  <option value="digital-transformation">Digital Transformation</option>
                  <option value="data-analytics">Data Analytics</option>
                  <option value="other">Other</option>
                </Select>
              </FormGroup>

              <FormGroup>
                <Label htmlFor="project_details">Project Details *</Label>
                <TextArea
                  id="project_details"
                  name="project_details"
                  value={formData.project_details}
                  onChange={handleInputChange}
                  placeholder="Tell us about your project or requirements..."
                  required
                />
              </FormGroup>

              <SubmitButton
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="interactive"
              >
                {isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      style={{
                        width: 20,
                        height: 20,
                        border: "2px solid #fff",
                        borderTop: "2px solid transparent",
                        borderRadius: "50%",
                      }}
                    />
                    Scheduling...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Schedule Meeting
                  </>
                )}
              </SubmitButton>
            </form>
          </FormContainer>

          <ContactInfo
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3>
              <Clock size={24} />
              Contact Information
            </h3>
            
            <ContactItem className="interactive">
              <ContactIcon>
                <Phone size={24} />
              </ContactIcon>
              <ContactText>
                <h4>Phone</h4>
                <p>+91 123-4567-890</p>
              </ContactText>
            </ContactItem>

            <ContactItem className="interactive">
              <ContactIcon>
                <Mail size={24} />
              </ContactIcon>
              <ContactText>
                <h4>Email</h4>
                <p>contact@altaric.com</p>
              </ContactText>
            </ContactItem>

            <ContactItem className="interactive">
              <ContactIcon>
                <Building size={24} />
              </ContactIcon>
              <ContactText>
                <h4>Business Hours</h4>
                <p>Mon - Fri: 9:00 AM - 8:00 PM IST</p>
              </ContactText>
            </ContactItem>
          </ContactInfo>
        </FormGrid>
      </ContentWrapper>
    </ContactFormContainer>
  );
};

export default ContactForm;