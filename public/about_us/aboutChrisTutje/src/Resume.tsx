import React from 'react';

type ResumeSectionProps = {
  title: string;
  content: string[];
};

const ResumeSection: React.FC<ResumeSectionProps> = ({ title, content }) => (
  <>
    <h2>{title}</h2>
    <ul style={{ listStyleType: 'none' }}>
      {content.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </>
);

const ResumeContent: React.FC<{ backgroundColor: string }> = ({ backgroundColor }) => {
  const sections = [
    { title: 'Summary', content: ['Entry level software engineer with Python, C++, and Java skills, available full-time.', 'Polymath with a scientific mind and a wide array of academic interests.', 'Has a background in music and aims for both creative and technical excellence.'] },
    { title: 'Skills', content: ['Coding in Python, C++, Java, HTML/CSS, and SQL', '10 years of hands-on experience in healthcare as a CNA'] },
    { title: 'Experience', content: ['TechWise cohort II mentorship program | 2023-present', 'Certified nurses aide, Valley View Village | Des Moines, IA | 515-265-2571 | 2012-2022'] },
    { title: 'Certification', content: ['Computer languages diploma', 'Bachelor of arts degree in biology and piano performance', 'CNA license', 'High School Diploma'] },
    { title: 'Education', content: ['DMACC | Ankeny, IA | 2023-2023', 'Grand View University | Des Moines, IA | 2012-2017', 'East High School | Des Moines, IA | 2008-2012'] },
    { title: 'Passions', content: ['15+ years’ experience of composing on piano, synthesizer, percussion, and digital-audio-workstations', 'Keeps the body active as a member of the DMACC blades fencing club', 'A member of the DMACC philosophy and creative writing clubs', 'An enjoyer of world history and the arts', 'Longtime consumer of video games and software'] },
    { title: 'Projects', content: ['Techwise RPG Project: A small-scale, 2D turn-based RPG', 'Java Calculator: A calculator with GUI and unit tests that performs arithmetic and list operations', 'Chord Dictionary: A music tool with GUI that identifies 3-note chords'] },
  ];

  return (
    <div className="resume-content" style={{ backgroundColor: backgroundColor }}>
      <h1>Christopher Tutje</h1>
      <p>Ankeny, Iowa (open to relocation) | (515)-868-3366 | <a href="mailto:chris.tutje@gmail.com">chris.tutje@gmail.com</a></p>
      <p><a href="https://www.linkedin.com/in/christopher-tutje">LinkedIn</a> | <a href="https://github.com/ChrisTutje">Github</a></p>

      {sections.map((section, index) => (
        <ResumeSection key={index} title={section.title} content={section.content} />
      ))}

      <p>References are available upon request.</p>
    </div>
  );
};

export default ResumeContent;
