[![Node](https://github.com/alexandrelamberty/minerva-web-app/actions/workflows/node.yaml/badge.svg)](https://github.com/alexandrelamberty/minerva-web-app/actions/workflows/node.yaml)
[![Linting](https://github.com/alexandrelamberty/minerva-web-app/actions/workflows/lint.yaml/badge.svg)](https://github.com/alexandrelamberty/minerva-web-app/actions/workflows/lint.yaml)
[![Formatting](https://github.com/alexandrelamberty/minerva-web-app/actions/workflows/prettier.yaml/badge.svg)](https://github.com/alexandrelamberty/minerva-web-app/actions/workflows/prettier.yaml)
[![Docker](https://github.com/alexandrelamberty/minerva-web-app/actions/workflows/docker.yaml/badge.svg)](https://github.com/alexandrelamberty/minerva-web-app/actions/workflows/docker.yaml)
[![DockerHub](https://img.shields.io/badge/DockerHub-images-important.svg?logo=Docker)](https://hub.docker.com/r/alexandrelamberty/minerva-web-app)

# Minerva Web Application

This repository contains the source code and documentation for a Training Management System web application, designed to consume the [Minerva API](ttps://github.com/alexandrelamberty/minerva-api) backend.
It facilitate the management of training programs. The system is built to cater to the needs of administrators, staff members, students, and teachers involved in the training process.

> This repository is part of the [Minerva](https://github.com/alexandrelamberty/minerva) project.

## Features

### Admin and Staff

- Manage, create, update, and delete various entities including:
  - Categories: Categorize different types of courses.
  - Courses: Create and manage courses offered.
  - Trainings: Organize and manage training programs.
  - Students: Add, update, and remove student records.
  - Teachers: Manage teacher information.
  - Users: Control user access and permissions.
  - Course dates: Set dates for courses.
  - Course dates attendances: Track attendance for course dates.
  - Course materials: Upload and manage course materials.
- Assign teachers to courses and trainings.
- Arrange the schedule of courses to avoid conflicts.
- Add materials to courses for students' reference.
- Invite users to join the system and provide necessary access.
- Approve or decline enrollment requests from students.

### Students

- Dashboard: Display upcoming courses, main trainings, and other relevant information.
- View enrolled trainings: Access a list of trainings they are enrolled in.
- View assigned courses: See the courses they are assigned to.
- View assigned teachers: Identify teachers associated with their trainings and courses.
- Track attendance and progress: Monitor attendance and progress in their courses.
- Access course materials and schedule: View and download materials related to their courses, along with the schedule.
- Message teachers: Send messages directly to their assigned teachers.

### Teachers

- Dashboard: Provide an overview of upcoming courses, main trainings, and other relevant information.
- View assigned trainings: See the trainings they are assigned to.
- View assigned courses: Access the courses they are assigned to.
- View assigned course dates: Identify the specific dates they are assigned to for courses.
- Manage course data: Update course-related information such as course dates, attendances, materials, name, description, and schedule.
- Message students: Communicate with students through the messaging system.

## Technologies

- [React](https://react.dev/)
- [React Router](https://react-hook-form.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Redux](https://redux.js.org/)
- [React Redux](https://react-redux.js.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Flowbite React](https://flowbite-react.com/)
- [HeadlessUI](https://headlessui.com/)
- [Vite](https://react.dev/)

## Requirements

- [PNPM](https://pnpm.io/)
- [Docker](https://pnpm.io/)

## Usage

See the [Minerva](https://github.com/alexandrelamberty/minerva) project.

## Development

### Configuration

```properties
VITE_API_URL=http://localhost:3000
```

## Tests

## Docker

Build the image.

```shell
docker build . -t alexandrelamberty/minerva-web-app:tag
```

Run the image with the default network and storage.

```shell
docker run -p 8080:8080 --network=minerva_default --mount source=media_data,target=/usr/src/app/public --env-file .env.dev --name minerva-web-app -d alexandrelamberty/minerva-web-app:tag
```

Push image to DockerHub

```shell
docker push alexandrelamberty/minerva-web-app:tag
```

## References
