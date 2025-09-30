// --- Advanced School Management JS ---

// Example data (simulate database)
const students = [
	{ id: 1, name: "Arta Berisha" },
	{ id: 2, name: "Driton Gashi" },
	{ id: 3, name: "Lea Krasniqi" }
];
const subjects = [
	{ id: 1, name: "Matematikë" },
	{ id: 2, name: "Gjuhë Shqipe" },
	{ id: 3, name: "Shkencat Natyrore" }
];

// Populate dropdowns on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
	populateDropdown('student-select', students);
	populateDropdown('subject-select', subjects);
	restoreGradeForm();
	addButtonAnimations();
});

function populateDropdown(selectId, items) {
	const select = document.getElementById(selectId);
	if (!select) return;
	// Remove all except first option
	while (select.options.length > 1) select.remove(1);
	items.forEach(item => {
		const opt = document.createElement('option');
		opt.value = item.id;
		opt.textContent = item.name;
		select.appendChild(opt);
	});
}

// Grade saving with localStorage
document.getElementById('save-grade-button')?.addEventListener('click', () => {
	const studentId = document.getElementById('student-select').value;
	const subjectId = document.getElementById('subject-select').value;
	const grade = document.getElementById('grade-input').value;
	if (!studentId || !subjectId || grade === "") {
		showMessage('Ju lutem plotësoni të gjitha fushat!', 'error');
		return;
	}
	if (grade < 0 || grade > 100) {
		showMessage('Nota duhet të jetë mes 0 dhe 100!', 'error');
		return;
	}
	// Save to localStorage
	const key = `grade_${studentId}_${subjectId}`;
	localStorage.setItem(key, grade);
	showMessage('Nota u ruajt me sukses!', 'success');
});

function restoreGradeForm() {
	// Restore last selected student/subject/grade
	const studentSel = document.getElementById('student-select');
	const subjectSel = document.getElementById('subject-select');
	const gradeInput = document.getElementById('grade-input');
	if (!studentSel || !subjectSel || !gradeInput) return;
	studentSel.addEventListener('change', updateGradeInput);
	subjectSel.addEventListener('change', updateGradeInput);
	function updateGradeInput() {
		const key = `grade_${studentSel.value}_${subjectSel.value}`;
		const saved = localStorage.getItem(key);
		gradeInput.value = saved !== null ? saved : '';
	}
}

// Animated button effect
function addButtonAnimations() {
	document.querySelectorAll('input[type="button"]').forEach(btn => {
		btn.addEventListener('mousedown', () => {
			btn.style.transform = 'scale(0.96)';
		});
		btn.addEventListener('mouseup', () => {
			btn.style.transform = '';
		});
		btn.addEventListener('mouseleave', () => {
			btn.style.transform = '';
		});
	});
}

// Show message (success/error)
function showMessage(msg, type) {
	let box = document.getElementById('msg-box');
	if (!box) {
		box = document.createElement('div');
		box.id = 'msg-box';
		box.style.position = 'fixed';
		box.style.top = '30px';
		box.style.left = '50%';
		box.style.transform = 'translateX(-50%)';
		box.style.zIndex = '9999';
		box.style.padding = '16px 32px';
		box.style.borderRadius = '10px';
		box.style.fontSize = '1.1rem';
		box.style.boxShadow = '0 2px 12px rgba(0,0,0,0.12)';
		document.body.appendChild(box);
	}
	box.textContent = msg;
	box.style.background = type === 'success' ? '#4caf50' : '#e53935';
	box.style.color = '#fff';
	box.style.opacity = '1';
	setTimeout(() => {
		box.style.transition = 'opacity 0.7s';
		box.style.opacity = '0';
	}, 1800);
}
