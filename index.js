const rowName = document.getElementById("rowName");
const rowCourse = document.getElementById("rowCourse");
const rowInstructor = document.getElementById("rowInstructor");
const rowSignature = document.getElementById("rowSignature");
const rowIssued = document.getElementById("rowIssued");
const rowSerial = document.getElementById("rowSerial");

const elstudentName = document.getElementById("studentName");
const elcourseName = document.getElementById("courseName");
const elinstructorName = document.getElementById("instructorName");
const elsignatureFile = document.getElementById("signatureFile");
const elissuedDate = document.getElementById("issuedDate");
const elserial = document.getElementById("serial");

const btnFillDemo = document.getElementById("btnFillDemo");
const btnReset = document.getElementById("btnReset");
const btnPrint = document.getElementById("btnPrint");

const certIssued = document.getElementById("certIssued");
const certSerial = document.getElementById("certSerial");
const certName = document.getElementById("certName");
const certCourse = document.getElementById("certCourse");
const certSignatureImg = document.getElementById("certSignatureImg");
const certInstructor = document.getElementById("certInstructor");

const statusLine = document.getElementById("statusLine");
const validBadge = document.getElementById("validBadge");

let signatureObjectURL = null;

function formData(yyyymmdd) {
  if (!yyyymmdd) return "-";
  const [y, m, d] = yyyymmdd.split("-");
  if (!y || !m || !d) return "-";
  return `${d} - ${m} - ${y}`;
}

function validateName(value) {
  return value.trim().length >= 3;
}

function validateCourse(value) {
  return value.trim().length >= 6;
}

function validateInstructor(value) {
  return value.trim().length >= 3;
}

function validateSignature(fileInput) {
  const file = fileInput.files && fileInput.files[0];
  return Boolean(file);
}

function validateIssued(value) {
  return Boolean(value);
}

function validateSerial(value) {
  const v = value.trim();
  if (v.length < 6) return;
  return /^[A-Za-z0-9-]+$/.test(v);
}

function setRow(elRow, isValid) {
  elRow.classList.toggle("invalid", !isValid);
}

function UpdateCert() {
  certIssued.textContent = formData(elissuedDate.value);
  certSerial.textContent = elserial.value.trim() || "-";
  certName.textContent = elstudentName.value || "Student Name";
  certCourse.textContent = elcourseName.value || "Course Name Gose Here";
  certInstructor.textContent =
    elinstructorName.value || "Instructor Name Gose Here";
}

function ApplaySignature() {
  const file = elsignatureFile.files && elsignatureFile.files[0];
  if (!file || !file.type || !file.type.startsWith("image/")) return;
  if (signatureObjectURL) {
    URL.revokeObjectURL(signatureObjectURL);
    signatureObjectURL = null;
  }
  signatureObjectURL = URL.createObjectURL(file);
  certSignatureImg.src = signatureObjectURL;
}

function ValidateALL() {
  const okName = validateName(elstudentName.value);
  const okcourse = validateCourse(elcourseName.value);
  const okIssued = validateIssued(elissuedDate.value);
  const okInstructor = validateInstructor(elinstructorName.value);
  const okSignature = validateSignature(elsignatureFile);
  const okSerial = validateSerial(elserial.value);
  setRow(rowIssued, okIssued);
  setRow(rowSerial, okSerial);
  setRow(rowName, okName);
  setRow(rowCourse, okcourse);
  setRow(rowSignature, okSignature);
  setRow(rowInstructor, okInstructor);
  const AllOK =
    okName && okcourse && okIssued && okInstructor && okSignature && okSerial;
  btnPrint.disabled = !AllOK;
  if (AllOK) {
    statusLine.className = "status ok";
    statusLine.textContent = "✅ All fields are valid. Ready to print.";
    validBadge.textContent = "✅ Ready to print";
  } else {
    statusLine.className = "status bad";
    statusLine.textContent =
      "❌ Please fix the highlighted fields to enable printing.";
    validBadge.textContent = "❌ Not ready to print";
  }
  return AllOK;
}

function onInputChange() {
  UpdateCert();
  ValidateALL();
}

[elstudentName, elcourseName, elinstructorName, elissuedDate, elserial].forEach(
  (el) => {
    el.addEventListener("input", onInputChange);
    el.addEventListener("change", onInputChange);
  },
);

elsignatureFile.addEventListener("change", () => {
  ApplaySignature();
  ValidateALL();
});

btnPrint.addEventListener("click", () => {
  const AllOK = ValidateALL();
  if (!AllOK) return;
  window.print();
});

btnReset.addEventListener("click", () => {
  elstudentName.value = "";
  elcourseName.value = "";
  elinstructorName.value = "";
  elsignatureFile.value = "";
  elissuedDate.value = "";
  elserial.value = "";
  if (signatureObjectURL) {
    URL.revokeObjectURL(signatureObjectURL);
    signatureObjectURL = null;
  }
  certSignatureImg.src = "./Images/DefaultSig.png";
  onInputChange();
});

btnFillDemo.addEventListener("click", () => {
  elstudentName.value = "Mohmmad Abu-Hadhoud";
  elcourseName.value = "Time Managment & Programming Advices";
  elinstructorName.value = "Dr. Mohmmad Abu-Hadhoud";
  elissuedDate.value = new Date().toISOString().slice(0, 10);
  elserial.value = "2026-Musab-Omar";
  if (signatureObjectURL) {
    URL.revokeObjectURL(signatureObjectURL);
    signatureObjectURL = null;
  }
  certSignatureImg.src = "./Images/Sig1.png";
  onInputChange();
});

onInputChange();
