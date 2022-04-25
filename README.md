# ECE 395/396 Electrical Engineering Senior Projects

## Project Outline
This project will incorporate modern ML techniques for [automatic manga translation](https://arxiv.org/abs/2012.14271) and [automatic OCR capture](https://arxiv.org/abs/1803.08670), among others, to create an effective language learning tool for comic readers. 

This is an ElectronJS desktop application. 
The text detection model was trained using detectronv2 and converted to a pytorch format. 
Because of github limitations, the models are not provided in this repository.

<Reminder to include seperate file hosting link to BOTH GPU and CPU detection models>

Currently the application is set up to run the ML model on a seperate python Flask server.
Because of limitations of our development environment, we have been testing this with the CPU model. The CUDA model should work too.

<Include pictures here>
## Dependencies
1. npm
2. Python3
3. Flask
4. Detectronv2

## Usage
Start app (dev, not build) by typing in the root directory:
```
\\ frontend
cd frontend
npm run dev

\\ backend
cd flask
venv\Scripts\activate.bat
SET FLASK_APP=main.py
SET FLASK_DEV=development
flask run
```

 ## Features completed
- Reading Manga
- Text box detection Model (CPU, runs on host PC)
- Rudimentary OCR
- Dictionary lookup
- Anki Sentence + Definition Integration

  ## Features to be added
- Improved OCR detection (Remove furigana & noise)
- Allow for exporting manga panel context to anki cards

## Course info
[The Cooper Union for the Advancement of Science and Art](https://cooper.edu/engineering/courses/electrical-and-computer-engineering-undergraduate/ece-395)
> ECE 395 and ECE 396 constitute the year-long senior design project. Students work in small groups on projects chosen with the advice and consent of the faculty adviser. Projects may be oriented towards research or product development, and may be in any area of electrical and computer engineering, such as in: computer engineering, signal processing (imaging, sensor arrays, multimedia), telecommunications, computer networks, microwaves, optics, advanced electronics, VLSI chip design, or an interdisciplinary area such as robotics or bioengineering. Students perform all aspects of project management, such as scheduling, budgeting, system design and developing milestones, as well as technical work including hardware and software implementation, testing and performance evaluation. Students also give several spontaneous and rehearsed oral presentations and prepare written reports. Students attend weekly lectures covering: social, economic, legal and ethical issues; safety and laboratory practice; design methodologies; technical writing; preparation of multimedia presentations and tailoring presentations to target audiences.
