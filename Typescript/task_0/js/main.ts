interface Student {
	firstname: string;
	lastname: string;
	age: number;
	location: string;
}

const student1: Student = {
	firstname: 'John',
	lastname: 'Doe',
	age: 1000,
	location: 'Helsinki'
}

const student2: Student = {
	firstname: 'Jane',
	lastname: 'Doe',
	age: 1001,
	location: 'Oslo'
}

const studentsList: Student[] = [student1, student2];
