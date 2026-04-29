# Руководство по реализации платформы менторства

## Оглавление
1. [Подготовительный этап](#подготовительный-этап)
2. [Фаза 1: MVP (Месяцы 1-3)](#фаза-1-mvp-месяцы-1-3)
3. [Фаза 2: Beta Launch (Месяцы 4-6)](#фаза-2-beta-launch-месяцы-4-6)
4. [Фаза 3: Growth (Месяцы 7-12)](#фаза-3-growth-месяцы-7-12)
5. [Фаза 4: Scale (Год 2+)](#фаза-4-scale-год-2)
6. [Чеклисты для каждого этапа](#чеклисты-для-каждого-этапа)

---

## Подготовительный этап

### Неделя 1-2: Валидация и планирование

#### ✅ Задачи:

**1. Валидация идеи**
- [ ] Провести 20-30 интервью с потенциальными студентами
- [ ] Опросить 10-15 потенциальных менторов
- [ ] Проверить готовность платить (цены, модель)
- [ ] Собрать feedback по функциям

**2. Финализация концепции**
- [ ] Определить название школы
- [ ] Создать brand identity (миссия, ценности, tone of voice)
- [ ] Финализировать УТП (уникальное торговое предложение)
- [ ] Определить позиционирование на рынке

**3. Юридические вопросы**
- [ ] Регистрация бизнеса (ИП/ООО)
- [ ] Разработка договоров (с менторами, со студентами)
- [ ] Privacy Policy и Terms of Service (GDPR compliance)
- [ ] Выбор юрисдикции для бизнеса

**4. Финансовое планирование**
- [ ] Определить начальный бюджет ($20k-50k рекомендуется)
- [ ] Распределение бюджета: разработка 60%, маркетинг 25%, операционные 15%
- [ ] Открыть бизнес счет
- [ ] Настроить бухгалтерию

**5. Техническая подготовка**
- [ ] Зарегистрировать домен (название.com, название.ru)
- [ ] Купить email домен (info@, support@)
- [ ] Создать GitHub организацию
- [ ] Выбрать hosting провайдера

**Deliverables:**
- Validated business concept
- Legal entity
- Domain и infrastructure готовы
- Бюджет распределен

---

## Фаза 1: MVP (Месяцы 1-3)

**Цель:** Создать минимально функциональную платформу с core features

### 📋 Технический стек

#### Frontend
```
Framework: Next.js 14+ (App Router)
Styling: Tailwind CSS
UI Components: shadcn/ui или Radix UI
State Management: Zustand или Redux Toolkit
Forms: React Hook Form + Zod validation
Authentication UI: next-auth
PWA: next-pwa
```

#### Backend
```
Runtime: Node.js 20+
Framework: Next.js API Routes или NestJS (если нужна микросервисная архитектура)
Database: PostgreSQL 15+
ORM: Prisma
Cache: Redis (Upstash для serverless)
File Storage: AWS S3 или Cloudinary
Real-time: Socket.io или Pusher
```

#### Authentication & Authorization
```
Auth: NextAuth.js (now Auth.js)
OAuth Providers: Google, GitHub
Session: JWT + Database sessions
RBAC: Custom middleware
```

#### Payments
```
Provider: Stripe
Features: Subscriptions, webhooks, customer portal
```

#### Infrastructure
```
Frontend Hosting: Vercel
Backend: Vercel (API routes) или Railway/Render
Database: Neon, Supabase или Railway PostgreSQL
CDN: Cloudflare
Monitoring: Vercel Analytics + Sentry
```

#### Development Tools
```
Package Manager: pnpm
Version Control: Git + GitHub
CI/CD: GitHub Actions
Code Quality: ESLint, Prettier, Husky
Testing: Vitest + React Testing Library
```

---

### Месяц 1: Основа и инфраструктура

#### Неделя 1: Project Setup

**Задачи:**

1. **Инициализация проекта**
```bash
# Создать Next.js проект
npx create-next-app@latest mentorship-platform --typescript --tailwind --app

# Установить зависимости
pnpm add @prisma/client next-auth zustand
pnpm add -D prisma
```

2. **Структура проекта**
```
mentorship-platform/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── (auth)/         # Auth группа
│   │   ├── (dashboard)/    # Dashboard группа
│   │   ├── api/            # API routes
│   │   └── layout.tsx
│   ├── components/
│   │   ├── ui/            # shadcn/ui компоненты
│   │   ├── layouts/       # Layout компоненты
│   │   └── features/      # Feature-specific компоненты
│   ├── lib/
│   │   ├── db.ts          # Prisma client
│   │   ├── auth.ts        # NextAuth config
│   │   └── utils.ts
│   ├── hooks/             # Custom React hooks
│   ├── types/             # TypeScript types
│   └── config/            # Configuration
├── prisma/
│   └── schema.prisma
├── public/
└── package.json
```

3. **Настройка базы данных**

Создать `prisma/schema.prisma`:
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  email         String    @unique
  name          String?
  image         String?
  role          Role      @default(STUDENT)
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  accounts      Account[]
  sessions      Session[]
  profile       Profile?
  enrollments   Enrollment[]
  mentorProfile MentorProfile?

  @@map("users")
}

enum Role {
  STUDENT
  MENTOR
  ADMIN
}

model Profile {
  id        String   @id @default(cuid())
  userId    String   @unique
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  bio       String?
  github    String?
  linkedin  String?
  portfolio String?
  skills    String[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@map("profiles")
}

model MentorProfile {
  id          String   @id @default(cuid())
  userId      String   @unique
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expertise   String[]
  hourlyRate  Int?
  available   Boolean  @default(true)
  bio         String
  experience  Int      // years
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  sessions    Session[]

  @@map("mentor_profiles")
}

// Добавить остальные модели...
```

4. **Настройка NextAuth**

Создать `src/lib/auth.ts`:
```typescript
import { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GitHubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id
        session.user.role = user.role
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
}
```

**Чеклист Неделя 1:**
- [ ] Next.js проект инициализирован
- [ ] Структура папок создана
- [ ] Prisma настроена, схема создана
- [ ] Database migrated (первая миграция)
- [ ] NextAuth настроена
- [ ] Environment variables настроены
- [ ] Git repository создан и first commit

---

#### Неделя 2: Authentication & User Management

**Задачи:**

1. **Страницы аутентификации**

Создать `src/app/(auth)/signin/page.tsx`:
```typescript
import { AuthForm } from '@/components/auth/AuthForm'

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <AuthForm mode="signin" />
    </div>
  )
}
```

Создать `src/components/auth/AuthForm.tsx`:
```typescript
'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { FaGoogle, FaGithub } from 'react-icons/fa'

export function AuthForm({ mode }: { mode: 'signin' | 'signup' }) {
  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-center">
        {mode === 'signin' ? 'Войти' : 'Зарегистрироваться'}
      </h2>

      <div className="space-y-4">
        <Button
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
          className="w-full"
          variant="outline"
        >
          <FaGoogle className="mr-2" />
          Продолжить с Google
        </Button>

        <Button
          onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
          className="w-full"
          variant="outline"
        >
          <FaGithub className="mr-2" />
          Продолжить с GitHub
        </Button>
      </div>
    </div>
  )
}
```

2. **Protected Routes Middleware**

Создать `src/middleware.ts`:
```typescript
import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      const path = req.nextUrl.pathname

      // Public routes
      if (path.startsWith('/auth')) return true

      // Protected routes
      if (path.startsWith('/dashboard')) return !!token
      if (path.startsWith('/admin')) return token?.role === 'ADMIN'

      return true
    },
  },
})

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/api/:path*']
}
```

3. **User Profile Setup**

После первого входа - перенаправление на onboarding:
```typescript
// src/app/onboarding/page.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const profileSchema = z.object({
  name: z.string().min(2),
  role: z.enum(['STUDENT', 'MENTOR']),
  bio: z.string().optional(),
  skills: z.array(z.string()),
})

export default function OnboardingPage() {
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(profileSchema)
  })

  const onSubmit = async (data) => {
    // API call to create profile
    await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return (
    // Onboarding form UI
  )
}
```

**Чеклист Неделя 2:**
- [ ] Sign in page создана
- [ ] Sign up page создана
- [ ] OAuth провайдеры работают
- [ ] Middleware для protected routes
- [ ] Onboarding flow для новых пользователей
- [ ] User profile CRUD API routes
- [ ] Session management работает

---

#### Неделя 3: Course Management System

**Задачи:**

1. **Database Schema для курсов**

Обновить `prisma/schema.prisma`:
```prisma
model Course {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  description String
  thumbnail   String?
  level       Level
  category    Category
  published   Boolean  @default(false)
  price       Int      @default(0) // в центах

  modules     Module[]
  enrollments Enrollment[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("courses")
}

enum Level {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}

enum Category {
  FRONTEND
  BACKEND
  FULLSTACK
  DEVOPS
}

model Module {
  id          String   @id @default(cuid())
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  title       String
  description String?
  order       Int

  lessons     Lesson[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("modules")
}

model Lesson {
  id          String     @id @default(cuid())
  moduleId    String
  module      Module     @relation(fields: [moduleId], references: [id], onDelete: Cascade)
  title       String
  content     String     // Markdown content
  videoUrl    String?
  duration    Int?       // в минутах
  order       Int
  type        LessonType

  progress    LessonProgress[]

  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt

  @@map("lessons")
}

enum LessonType {
  VIDEO
  TEXT
  QUIZ
  CODING
  PROJECT
}

model Enrollment {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  courseId    String
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)

  progress    Int      @default(0) // 0-100
  completed   Boolean  @default(false)

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([userId, courseId])
  @@map("enrollments")
}

model LessonProgress {
  id          String   @id @default(cuid())
  userId      String
  lessonId    String
  lesson      Lesson   @relation(fields: [lessonId], references: [id], onDelete: Cascade)

  completed   Boolean  @default(false)
  timeSpent   Int      @default(0) // в секундах

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@unique([userId, lessonId])
  @@map("lesson_progress")
}
```

2. **API Routes для курсов**

Создать `src/app/api/courses/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/courses - список всех курсов
export async function GET() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    include: {
      modules: {
        include: {
          lessons: true
        }
      }
    }
  })

  return NextResponse.json(courses)
}

// POST /api/courses - создать курс (только admin/mentor)
export async function POST(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role === 'STUDENT') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const data = await req.json()
  const course = await prisma.course.create({
    data: {
      ...data,
      slug: data.title.toLowerCase().replace(/\s+/g, '-')
    }
  })

  return NextResponse.json(course)
}
```

3. **Course Catalog Page**

Создать `src/app/courses/page.tsx`:
```typescript
import { CourseCard } from '@/components/courses/CourseCard'
import { prisma } from '@/lib/db'

export default async function CoursesPage() {
  const courses = await prisma.course.findMany({
    where: { published: true }
  })

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Наши курсы</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
```

4. **Course Detail Page**

Создать `src/app/courses/[slug]/page.tsx`:
```typescript
import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import { EnrollButton } from '@/components/courses/EnrollButton'

export default async function CoursePage({
  params
}: {
  params: { slug: string }
}) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      modules: {
        include: {
          lessons: true
        },
        orderBy: { order: 'asc' }
      }
    }
  })

  if (!course) notFound()

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Course info */}
        <div className="lg:col-span-2">
          <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
          <p className="text-lg text-gray-600 mb-8">{course.description}</p>

          {/* Curriculum */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Программа курса</h2>
            {course.modules.map(module => (
              <ModuleAccordion key={module.id} module={module} />
            ))}
          </div>
        </div>

        {/* Right: Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 p-6 bg-white rounded-lg shadow">
            <div className="mb-4">
              <span className="text-3xl font-bold">
                {course.price === 0 ? 'Бесплатно' : `$${course.price / 100}`}
              </span>
            </div>
            <EnrollButton courseId={course.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
```

**Чеклист Неделя 3:**
- [ ] Database schema для курсов создана
- [ ] API routes для CRUD курсов
- [ ] Course catalog page
- [ ] Course detail page
- [ ] Enrollment flow
- [ ] Course progress tracking
- [ ] Admin panel для создания курсов (базовый)

---

#### Неделя 4: Booking System & Communication

**Задачи:**

1. **Database Schema для бронирований**

Обновить `prisma/schema.prisma`:
```prisma
model MentorSession {
  id          String         @id @default(cuid())
  mentorId    String
  mentor      MentorProfile  @relation(fields: [mentorId], references: [id])
  studentId   String
  student     User           @relation(fields: [studentId], references: [id])

  scheduledAt DateTime
  duration    Int            @default(60) // minutes
  status      SessionStatus  @default(PENDING)

  meetingUrl  String?
  notes       String?

  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt

  @@map("mentor_sessions")
}

enum SessionStatus {
  PENDING
  CONFIRMED
  COMPLETED
  CANCELLED
}

model Availability {
  id          String   @id @default(cuid())
  mentorId    String
  mentor      MentorProfile @relation(fields: [mentorId], references: [id])

  dayOfWeek   Int      // 0-6 (Sunday-Saturday)
  startTime   String   // "09:00"
  endTime     String   // "17:00"

  createdAt   DateTime @default(now())

  @@map("availability")
}
```

2. **Mentor Availability API**

Создать `src/app/api/mentors/[id]/availability/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const availability = await prisma.availability.findMany({
    where: { mentorId: params.id }
  })

  return NextResponse.json(availability)
}

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json()

  const availability = await prisma.availability.create({
    data: {
      mentorId: params.id,
      ...data
    }
  })

  return NextResponse.json(availability)
}
```

3. **Booking Calendar Component**

Создать `src/components/booking/BookingCalendar.tsx`:
```typescript
'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { TimeSlotPicker } from './TimeSlotPicker'

export function BookingCalendar({ mentorId }: { mentorId: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedTime, setSelectedTime] = useState<string>()

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) return

    const scheduledAt = new Date(selectedDate)
    const [hours, minutes] = selectedTime.split(':')
    scheduledAt.setHours(parseInt(hours), parseInt(minutes))

    await fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({
        mentorId,
        scheduledAt: scheduledAt.toISOString(),
        duration: 60
      })
    })
  }

  return (
    <div className="space-y-6">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        disabled={(date) => date < new Date()}
      />

      {selectedDate && (
        <TimeSlotPicker
          mentorId={mentorId}
          date={selectedDate}
          onSelect={setSelectedTime}
        />
      )}

      <button onClick={handleBook} disabled={!selectedTime}>
        Забронировать сессию
      </button>
    </div>
  )
}
```

4. **Zoom Integration для видео-звонков**

Создать `src/lib/zoom.ts`:
```typescript
// Простая интеграция - создавать meeting link через API
export async function createZoomMeeting(sessionId: string) {
  // Опция 1: Zoom API (требует OAuth app)
  // Опция 2: Использовать Daily.co, Whereby или другой сервис
  // Опция 3: Простая интеграция - просто сохранить Google Meet link

  // Для MVP - можно просто генерировать Google Meet или использовать whereby.com
  const meetingUrl = `https://whereby.com/session-${sessionId}`

  return meetingUrl
}
```

5. **Email уведомления**

Настроить Resend или SendGrid для email:
```typescript
// src/lib/email.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendSessionConfirmation({
  to,
  sessionDetails
}: {
  to: string
  sessionDetails: any
}) {
  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to,
    subject: 'Ваша менторская сессия подтверждена',
    html: `
      <h1>Сессия подтверждена</h1>
      <p>Дата: ${sessionDetails.date}</p>
      <p>Время: ${sessionDetails.time}</p>
      <p>Ссылка на встречу: ${sessionDetails.meetingUrl}</p>
    `
  })
}
```

**Чеклист Неделя 4:**
- [ ] Database schema для сессий создана
- [ ] Mentor availability настроена
- [ ] Booking calendar UI
- [ ] API для создания сессий
- [ ] Email уведомления работают
- [ ] Video meeting integration (Zoom/Whereby)
- [ ] Session management dashboard

---

### Месяц 2: Core Features & Content

#### Неделя 5: Dashboard & Progress Tracking

**Задачи:**

1. **Student Dashboard**

Создать `src/app/dashboard/page.tsx`:
```typescript
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { ProgressChart } from '@/components/dashboard/ProgressChart'
import { UpcomingSessions } from '@/components/dashboard/UpcomingSessions'
import { ContinueLearning } from '@/components/dashboard/ContinueLearning'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  const enrollments = await prisma.enrollment.findMany({
    where: { userId: session.user.id },
    include: { course: true }
  })

  const upcomingSessions = await prisma.mentorSession.findMany({
    where: {
      studentId: session.user.id,
      scheduledAt: { gte: new Date() },
      status: 'CONFIRMED'
    },
    include: { mentor: true },
    orderBy: { scheduledAt: 'asc' },
    take: 5
  })

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">
        Привет, {session.user.name}! 👋
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          <ContinueLearning enrollments={enrollments} />
          <ProgressChart enrollments={enrollments} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <UpcomingSessions sessions={upcomingSessions} />
        </div>
      </div>
    </div>
  )
}
```

2. **Progress Tracking Component**

Создать `src/components/dashboard/ProgressChart.tsx`:
```typescript
'use client'

import { Line } from 'react-chartjs-2'

export function ProgressChart({ enrollments }) {
  const data = {
    labels: enrollments.map(e => e.course.title),
    datasets: [{
      label: 'Прогресс',
      data: enrollments.map(e => e.progress),
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1
    }]
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Ваш прогресс</h2>
      <Line data={data} />
    </div>
  )
}
```

3. **Badges & Achievements System**

Обновить `prisma/schema.prisma`:
```prisma
model Badge {
  id          String   @id @default(cuid())
  name        String
  description String
  icon        String
  criteria    Json     // { type: 'courses_completed', count: 5 }

  userBadges  UserBadge[]

  @@map("badges")
}

model UserBadge {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  badgeId     String
  badge       Badge    @relation(fields: [badgeId], references: [id])

  earnedAt    DateTime @default(now())

  @@unique([userId, badgeId])
  @@map("user_badges")
}
```

**Чеклист Неделя 5:**
- [ ] Student dashboard создан
- [ ] Mentor dashboard создан
- [ ] Progress tracking работает
- [ ] Визуализация прогресса (графики)
- [ ] Upcoming sessions widget
- [ ] Badges system реализована
- [ ] Achievement notifications

---

#### Неделя 6-7: Content Creation

**Задачи:**

1. **Создать starter курсы**

**Курс 1: HTML & CSS Основы**
- Module 1: Введение в HTML
  - Lesson 1: Что такое HTML
  - Lesson 2: Основные теги
  - Lesson 3: Структура документа
  - Lesson 4: Практика: Создай свою первую страницу

- Module 2: CSS Стилизация
  - Lesson 1: Селекторы
  - Lesson 2: Box Model
  - Lesson 3: Flexbox
  - Lesson 4: Практика: Стилизация страницы

**Курс 2: JavaScript Основы**
- Module 1: Введение в JavaScript
- Module 2: Переменные и типы данных
- Module 3: Функции
- Module 4: DOM манипуляция

**Курс 3: React для начинающих**
- Module 1: Что такое React
- Module 2: Components
- Module 3: State и Props
- Module 4: Hooks

2. **Content Management System**

Создать admin panel для создания контента:
```typescript
// src/app/admin/courses/new/page.tsx
'use client'

import { useForm } from 'react-hook-form'
import { MDXEditor } from '@/components/editor/MDXEditor'

export default function NewCoursePage() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    await fetch('/api/admin/courses', {
      method: 'POST',
      body: JSON.stringify(data)
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Course Title" />
      <input {...register('description')} placeholder="Description" />

      <MDXEditor
        onChange={(content) => setValue('content', content)}
      />

      <button type="submit">Create Course</button>
    </form>
  )
}
```

3. **Video hosting**

Интеграция с видео платформой:
- Опция 1: YouTube (бесплатно, unlisted videos)
- Опция 2: Vimeo (платно, better player)
- Опция 3: Cloudflare Stream (самое быстрое)
- Опция 4: Self-hosted (AWS S3 + CloudFront)

**Для MVP: YouTube unlisted videos**

```typescript
// src/components/video/VideoPlayer.tsx
export function VideoPlayer({ videoUrl }: { videoUrl: string }) {
  // Extract YouTube video ID
  const videoId = videoUrl.split('v=')[1]

  return (
    <div className="aspect-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      />
    </div>
  )
}
```

**Чеклист Неделя 6-7:**
- [ ] 3 starter курса созданы
- [ ] Минимум 20-30 уроков всего
- [ ] Видео записаны и загружены
- [ ] Квизы созданы для каждого модуля
- [ ] Практические задания подготовлены
- [ ] Admin CMS для контента работает
- [ ] Video player интегрирован

---

#### Неделя 8: Payments Integration

**Задачи:**

1. **Stripe Setup**

```bash
pnpm add stripe @stripe/stripe-js
```

Создать `src/lib/stripe.ts`:
```typescript
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
})

export async function createCheckoutSession({
  userId,
  priceId,
  successUrl,
  cancelUrl
}: {
  userId: string
  priceId: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId
    }
  })

  return session
}
```

2. **Subscription Plans в Stripe**

Создать products в Stripe Dashboard:
- Free (в базе данных, не в Stripe)
- Pro: $20/month
- Premium: $50/month

Получить Price IDs и добавить в env:
```env
STRIPE_PRICE_PRO=price_xxx
STRIPE_PRICE_PREMIUM=price_xxx
```

3. **Checkout API Route**

Создать `src/app/api/checkout/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createCheckoutSession } from '@/lib/stripe'

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { priceId } = await req.json()

  const checkoutSession = await createCheckoutSession({
    userId: session.user.id,
    priceId,
    successUrl: `${process.env.NEXT_PUBLIC_URL}/dashboard?success=true`,
    cancelUrl: `${process.env.NEXT_PUBLIC_URL}/pricing?canceled=true`
  })

  return NextResponse.json({ url: checkoutSession.url })
}
```

4. **Webhooks для Stripe events**

Создать `src/app/api/webhooks/stripe/route.ts`:
```typescript
import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  const event = stripe.webhooks.constructEvent(
    body,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET!
  )

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object
      await handleSubscriptionCreated(session)
      break

    case 'customer.subscription.updated':
      await handleSubscriptionUpdated(event.data.object)
      break

    case 'customer.subscription.deleted':
      await handleSubscriptionCanceled(event.data.object)
      break
  }

  return NextResponse.json({ received: true })
}

async function handleSubscriptionCreated(session: any) {
  const userId = session.metadata.userId

  await prisma.subscription.create({
    data: {
      userId,
      stripeSubscriptionId: session.subscription,
      stripePriceId: session.line_items.data[0].price.id,
      status: 'active',
    }
  })
}
```

5. **Pricing Page**

Создать `src/app/pricing/page.tsx`:
```typescript
import { PricingCard } from '@/components/pricing/PricingCard'

export default function PricingPage() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">
        Выберите ваш план
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <PricingCard
          name="Basic"
          price={0}
          features={[
            'Вводные курсы',
            'Сообщество',
            'Базовые проекты'
          ]}
          cta="Начать бесплатно"
        />

        <PricingCard
          name="Pro"
          price={20}
          priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PRO}
          featured
          features={[
            'Все курсы',
            'Code reviews',
            'Сертификаты',
            'Приоритетная поддержка'
          ]}
          cta="Начать Pro"
        />

        <PricingCard
          name="Premium"
          price={50}
          priceId={process.env.NEXT_PUBLIC_STRIPE_PRICE_PREMIUM}
          features={[
            'Всё из Pro',
            '1-on-1 менторство',
            'Карьерные консультации',
            'Job placement помощь'
          ]}
          cta="Начать Premium"
        />
      </div>
    </div>
  )
}
```

**Чеклист Неделя 8:**
- [ ] Stripe account setup
- [ ] Products и prices созданы в Stripe
- [ ] Checkout flow работает
- [ ] Webhooks настроены и тестированы
- [ ] Subscription management работает
- [ ] Customer portal (Stripe hosted)
- [ ] Pricing page создана

---

### Месяц 3: Polish & Launch Prep

#### Неделя 9: UI/UX Polish

**Задачи:**

1. **Landing Page**

Взять дизайн из Claude Design и имплементировать:
```typescript
// src/app/page.tsx
import { HeroSection } from '@/components/landing/HeroSection'
import { FeaturesSection } from '@/components/landing/FeaturesSection'
import { StatsSection } from '@/components/landing/StatsSection'
import { PricingSection } from '@/components/landing/PricingSection'
import { TestimonialsSection } from '@/components/landing/TestimonialsSection'
import { CTASection } from '@/components/landing/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
```

2. **Responsive Design Testing**

Тестировать на:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

3. **Accessibility**

- [ ] Все изображения имеют alt text
- [ ] Color contrast соответствует WCAG AA
- [ ] Keyboard navigation работает
- [ ] Screen reader friendly
- [ ] Focus indicators видимы
- [ ] ARIA labels где нужно

4. **Performance Optimization**

```typescript
// next.config.js
module.exports = {
  images: {
    domains: ['your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizeCss: true,
  },
}
```

- [ ] Images оптимизированы (Next.js Image)
- [ ] Lazy loading для videos
- [ ] Code splitting
- [ ] Bundle size <200kb (gzipped)
- [ ] Lighthouse score >90

**Чеклист Неделя 9:**
- [ ] Landing page полностью готова
- [ ] Responsive на всех экранах
- [ ] Accessibility проверена
- [ ] Performance оптимизирована
- [ ] Dark mode (опционально)
- [ ] Animations добавлены

---

#### Неделя 10: Onboarding Mentors

**Задачи:**

1. **Рекрутинг менторов**

- [ ] Создать landing page для менторов
- [ ] Application form для менторов
- [ ] Процесс верификации (проверка LinkedIn, GitHub)
- [ ] Onboarding документация для менторов

2. **Mentor Onboarding Flow**

```typescript
// src/app/mentors/apply/page.tsx
export default function MentorApplicationPage() {
  return (
    <div className="container max-w-2xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Стать ментором</h1>

      <MentorApplicationForm />
    </div>
  )
}
```

Application form должна собирать:
- Личная информация
- Опыт работы (years, companies)
- Области экспертизы (Frontend, Backend, etc.)
- GitHub profile
- LinkedIn profile
- Why do you want to be a mentor?
- Availability

3. **Mentor Admin Review**

Создать admin panel для review заявок:
```typescript
// src/app/admin/mentor-applications/page.tsx
export default async function MentorApplicationsPage() {
  const applications = await prisma.mentorApplication.findMany({
    where: { status: 'PENDING' }
  })

  return (
    <div>
      {applications.map(app => (
        <ApplicationCard
          key={app.id}
          application={app}
          onApprove={() => approveMentor(app.id)}
          onReject={() => rejectMentor(app.id)}
        />
      ))}
    </div>
  )
}
```

**Цель: 5-10 менторов до запуска**

**Чеклист Неделя 10:**
- [ ] Mentor landing page создана
- [ ] Application form работает
- [ ] Admin review system
- [ ] 5-10 менторов onboarded
- [ ] Mentor training material
- [ ] Mentor dashboard готов

---

#### Неделя 11: Testing & QA

**Задачи:**

1. **Написать тесты**

```typescript
// src/__tests__/auth.test.ts
import { render, screen } from '@testing-library/react'
import { SignInPage } from '@/app/(auth)/signin/page'

describe('Authentication', () => {
  it('shows sign in form', () => {
    render(<SignInPage />)
    expect(screen.getByText('Войти')).toBeInTheDocument()
  })

  it('allows OAuth sign in', () => {
    // Test OAuth flow
  })
})
```

Минимальное покрытие тестами:
- Authentication flows
- Payment flows
- Enrollment flows
- Booking flows

2. **End-to-End тестирование**

Использовать Playwright:
```typescript
// e2e/user-journey.spec.ts
import { test, expect } from '@playwright/test'

test('user can enroll in course', async ({ page }) => {
  await page.goto('/courses')
  await page.click('text=HTML & CSS Основы')
  await page.click('text=Записаться')

  // Should redirect to checkout
  await expect(page).toHaveURL(/checkout/)
})
```

3. **Bug Tracking Setup**

- [ ] GitHub Issues настроены
- [ ] Labels созданы (bug, feature, enhancement)
- [ ] Bug reporting process документирован

4. **Beta Testing**

Пригласить 10-20 beta testers:
- [ ] Friends and family
- [ ] Target audience representatives
- [ ] Собрать feedback через форму

**Чеклист Неделя 11:**
- [ ] Unit tests написаны (>50% coverage)
- [ ] E2E tests написаны
- [ ] Manual QA пройдено
- [ ] Beta testing завершено
- [ ] Critical bugs исправлены
- [ ] Bug tracking setup

---

#### Неделя 12: Launch Preparation

**Задачи:**

1. **Pre-launch Marketing**

- [ ] Email list собран (landing page с email signup)
- [ ] Social media аккаунты созданы (Instagram, TikTok, YouTube)
- [ ] First 10-20 posts подготовлены
- [ ] Launch announcement drafted

2. **Documentation**

- [ ] Help Center / FAQ создан
- [ ] User documentation
- [ ] Mentor documentation
- [ ] Terms of Service
- [ ] Privacy Policy
- [ ] Cookie Policy

3. **Analytics & Monitoring**

```typescript
// Google Analytics
import Script from 'next/script'

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
```

Setup:
- [ ] Google Analytics
- [ ] Sentry (error tracking)
- [ ] LogRocket или Hotjar (session recording)
- [ ] Vercel Analytics

4. **Final Checks**

- [ ] SSL certificate активен
- [ ] Domain DNS настроен
- [ ] Email delivery тестирован
- [ ] Payment flow тестирован (test mode)
- [ ] Backup strategy настроена
- [ ] Monitoring alerts настроены

5. **Launch Plan**

**Launch Day Checklist:**
1. Switch Stripe to production mode
2. Final smoke tests
3. Announce on social media
4. Send email to waitlist
5. Monitor errors and performance
6. Ready for support requests

**Чеклист Неделя 12:**
- [ ] Pre-launch marketing готова
- [ ] Documentation завершена
- [ ] Analytics setup
- [ ] Monitoring setup
- [ ] Launch checklist готов
- [ ] Emergency rollback plan есть

---

## Фаза 2: Beta Launch (Месяцы 4-6)

**Цель:** Получить первых 100-200 студентов, собрать feedback, итерировать

### Месяц 4: Launch & Initial Growth

#### Неделя 1-2: Public Launch

**Задачи:**

1. **Launch Campaign**

- [ ] Product Hunt launch
- [ ] Reddit posts (r/learnprogramming, r/webdev)
- [ ] Twitter/X announcement thread
- [ ] LinkedIn post
- [ ] Email to waitlist (если собрали)

2. **Early Bird Pricing**

- [ ] 50% discount для первых 100 студентов
- [ ] Lifetime deal для первых 20 (optional)
- [ ] Referral program запущен

3. **Content Marketing Start**

Создать контент календарь:
- TikTok: 5 videos/неделя
- Instagram Reels: 5 posts/неделя
- YouTube: 1 tutorial/неделя
- Blog: 2 posts/неделя

Примеры контента:
- "3 ошибки начинающих программистов"
- "HTML за 60 секунд"
- "Как я получил первую работу"
- "Day in the life - студент bootcamp"

4. **Community Building**

- [ ] Discord server создан
- [ ] Slack workspace (optional)
- [ ] Telegram группа
- [ ] Регулярные community events (weekly webinar)

**Метрики для отслеживания:**
- Registrations per day
- Conversion rate (visitor → signup)
- Activation rate (signup → enrolled in course)
- Retention (day 1, day 7, day 30)

**Цель месяц 4:** 50-100 registered users, 20-40 paid subscribers

---

#### Неделя 3-4: Feedback Collection & Iteration

**Задачи:**

1. **User Interviews**

Проводить 1-on-1 интервью с первыми пользователями:
- Что нравится?
- Что сложно?
- Что не хватает?
- Чего ожидали, но не нашли?

2. **Feedback Implementation**

Создать roadmap на основе feedback:
- Must-have features (критичные, без них не работает)
- Should-have (важные, но можно подождать)
- Nice-to-have (хорошо бы, но не критично)

3. **Bug Fixes**

Приоритет:
1. Critical bugs (блокируют использование)
2. High priority (негативно влияют на UX)
3. Medium/Low (минорные проблемы)

4. **Metrics Dashboard**

Создать internal admin dashboard:
```typescript
// src/app/admin/analytics/page.tsx
export default async function AnalyticsPage() {
  const stats = await getStats()

  return (
    <div>
      <StatsCard title="Total Users" value={stats.totalUsers} />
      <StatsCard title="Active Subscriptions" value={stats.activeSubscriptions} />
      <StatsCard title="MRR" value={`$${stats.mrr}`} />
      <StatsCard title="Churn Rate" value={`${stats.churnRate}%`} />

      <RevenueChart data={stats.revenueByMonth} />
      <UserGrowthChart data={stats.usersByWeek} />
    </div>
  )
}
```

**Чеклист Недели 3-4:**
- [ ] 10+ user interviews проведено
- [ ] Feedback собран и приоритизирован
- [ ] Top 5 bugs исправлены
- [ ] Analytics dashboard создан
- [ ] Retention metrics отслеживаются

---

### Месяц 5: Feature Expansion

#### Community Features

**Задачи:**

1. **Forum/Discussion Board**

Интегрировать Discourse или создать свой:
```typescript
// src/app/community/page.tsx
export default function CommunityPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Сообщество</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <DiscussionList />
        </div>

        <div className="lg:col-span-1">
          <PopularTopics />
          <ActiveMembers />
        </div>
      </div>
    </div>
  )
}
```

Database schema:
```prisma
model Discussion {
  id          String   @id @default(cuid())
  authorId    String
  author      User     @relation(fields: [authorId], references: [id])
  title       String
  content     String
  category    String

  replies     Reply[]
  likes       DiscussionLike[]

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  @@map("discussions")
}

model Reply {
  id           String     @id @default(cuid())
  discussionId String
  discussion   Discussion @relation(fields: [discussionId], references: [id])
  authorId     String
  author       User       @relation(fields: [authorId], references: [id])
  content      String

  createdAt    DateTime   @default(now())

  @@map("replies")
}
```

2. **Peer Code Review System**

Студенты могут просить code review от peers:
```typescript
// src/app/code-review/submit/page.tsx
export default function SubmitCodeReviewPage() {
  return (
    <div>
      <h1>Отправить код на review</h1>

      <form>
        <input name="title" placeholder="Название проекта" />
        <textarea name="description" placeholder="Что вы хотите, чтобы проверили?" />
        <input name="githubUrl" placeholder="GitHub repo URL" />

        <button type="submit">Отправить на review</button>
      </form>
    </div>
  )
}
```

3. **Study Groups**

Студенты могут создавать study groups:
- Встречаются регулярно
- Работают над проектами вместе
- Peer learning

**Чеклист Месяц 5:**
- [ ] Discussion board работает
- [ ] Code review system запущена
- [ ] Study groups feature
- [ ] Community guidelines опубликованы
- [ ] Moderation tools для admins

---

### Месяц 6: Content & Gamification

#### Задачи:

1. **Content Expansion**

Добавить 5-10 новых курсов:
- React Advanced
- Node.js & Express
- Database Design
- Git & GitHub
- TypeScript Basics

2. **Interactive Coding Challenges**

Интегрировать code playground:
- Опция 1: CodeSandbox embed
- Опция 2: StackBlitz embed
- Опция 3: Custom Monaco Editor

```typescript
// src/components/code/CodeChallenge.tsx
import Editor from '@monaco-editor/react'

export function CodeChallenge({ challenge }) {
  const [code, setCode] = useState(challenge.starterCode)
  const [result, setResult] = useState(null)

  const runCode = async () => {
    // Run code in sandbox
    const result = await fetch('/api/run-code', {
      method: 'POST',
      body: JSON.stringify({ code, tests: challenge.tests })
    })
    setResult(await result.json())
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      <Editor
        height="400px"
        defaultLanguage="javascript"
        value={code}
        onChange={setCode}
      />

      <div>
        <button onClick={runCode}>Run Tests</button>
        {result && <TestResults result={result} />}
      </div>
    </div>
  )
}
```

3. **Gamification Enhancement**

- [ ] Points system
- [ ] Leaderboards (weekly, all-time)
- [ ] Streaks (daily learning streak)
- [ ] More badges (10+ types)
- [ ] Levels (Beginner → Junior → Mid → Senior)

4. **Projects Showcase**

Студенты могут публиковать свои проекты:
```typescript
// src/app/showcase/page.tsx
export default async function ShowcasePage() {
  const projects = await prisma.project.findMany({
    include: { author: true },
    orderBy: { likes: 'desc' }
  })

  return (
    <div className="container mx-auto py-8">
      <h1>Проекты студентов</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}
```

**Чеклист Месяц 6:**
- [ ] 5-10 новых курсов запущено
- [ ] Code challenges интегрированы
- [ ] Gamification улучшена
- [ ] Projects showcase работает
- [ ] 100-200 активных студентов
- [ ] $2k-5k MRR

---

## Фаза 3: Growth (Месяцы 7-12)

**Цель:** Рост до 1,000+ активных студентов, $20k+ MRR

### Ключевые инициативы:

1. **AI Integration**
   - AI-powered mentor matching
   - AI tutor chatbot (ChatGPT API)
   - Персонализированные recommendations
   - Auto-generated quizzes

2. **Career Services**
   - Resume builder
   - Interview prep materials
   - Mock interviews с менторами
   - Job board integration
   - Company partnerships

3. **Mobile App** (опционально)
   - React Native app
   - Или просто PWA optimization

4. **Advanced Analytics**
   - Predictive analytics (кто at risk of churning)
   - Personalized learning paths
   - A/B testing infrastructure

5. **Marketing Scale-up**
   - SEO optimization
   - Paid advertising (Meta, Google, TikTok)
   - Influencer partnerships
   - Affiliate program

6. **Team Expansion**
   - Hire content creator
   - Hire community manager
   - Hire customer support
   - Contract developers (если нужно)

**Бюджет Месяцы 7-12:** $10k-20k/месяц
- Marketing: $7k-12k
- Salaries: $2k-5k
- Infrastructure: $1k-3k

---

## Фаза 4: Scale (Год 2+)

**Цель:** Profitable, sustainable business (5,000+ студентов, $100k+ MRR)

### Ключевые инициативы:

1. **Enterprise B2B**
   - Corporate training programs
   - Team licenses
   - Custom curricula для компаний

2. **Marketplace**
   - Менторы создают собственные курсы
   - Revenue share 70/30
   - Quality control system

3. **International Expansion**
   - English version
   - European markets
   - Local payment methods

4. **Advanced Certifications**
   - Industry-recognized certificates
   - Partnership с tech companies
   - Hiring partnerships

5. **Community Events**
   - Annual conference
   - Regional meetups
   - Hackathons

---

## Чеклисты для каждого этапа

### ✅ MVP Launch Checklist

**Technical:**
- [ ] Authentication works (OAuth + Email)
- [ ] User profiles functional
- [ ] 3+ courses published
- [ ] 20+ lessons total
- [ ] Video player works
- [ ] Enrollment flow works
- [ ] Payment integration (Stripe)
- [ ] Booking system functional
- [ ] Email notifications work
- [ ] Dashboard shows progress
- [ ] Mobile responsive
- [ ] Performance optimized (Lighthouse >85)

**Content:**
- [ ] 3 starter courses created
- [ ] Course videos recorded
- [ ] Practice exercises created
- [ ] Quizzes added

**Legal & Ops:**
- [ ] Terms of Service published
- [ ] Privacy Policy published
- [ ] Business registered
- [ ] Stripe account verified
- [ ] Domain configured
- [ ] SSL active

**Marketing:**
- [ ] Landing page live
- [ ] Pricing page ready
- [ ] Social media accounts created
- [ ] First content batch ready
- [ ] Email waitlist collected

**People:**
- [ ] 5-10 mentors onboarded
- [ ] Mentor training completed

---

### ✅ Beta Launch Checklist

**Product:**
- [ ] All MVP features stable
- [ ] Major bugs fixed
- [ ] User feedback collected
- [ ] Top requested features added
- [ ] Community features launched

**Growth:**
- [ ] 50-100 users registered
- [ ] 20-50 paid subscribers
- [ ] Content marketing running
- [ ] Community active (Discord/Slack)
- [ ] Referral program live

**Operations:**
- [ ] Support system setup
- [ ] Analytics tracking all metrics
- [ ] Feedback loop established
- [ ] Regular content schedule

---

### ✅ Growth Phase Checklist

**Product:**
- [ ] 10+ courses available
- [ ] AI features integrated
- [ ] Career services launched
- [ ] Advanced gamification
- [ ] Mobile optimized

**Growth:**
- [ ] 500-1000 active students
- [ ] $10k-20k MRR
- [ ] Strong retention (>80%)
- [ ] Paid marketing running
- [ ] SEO traffic growing

**Team:**
- [ ] Content creator hired
- [ ] Community manager hired
- [ ] Support person hired
- [ ] Processes documented

---

## 🎯 Success Metrics по этапам

### MVP (Month 3)
- 50-100 registered users
- 20-40 paid subscribers
- $500-1,000 MRR
- 30%+ course completion rate

### Beta (Month 6)
- 100-200 active users
- 50-100 paid subscribers
- $2k-5k MRR
- 50%+ course completion
- NPS 30+

### Growth (Month 12)
- 1,000+ active students
- $20k-50k MRR
- 60%+ completion rate
- 70%+ job placement
- NPS 40+

### Scale (Year 2)
- 5,000+ active students
- $100k+ MRR
- 80%+ completion rate
- 80%+ job placement
- Industry recognition
- Profitable unit economics

---

## 📚 Ресурсы и инструменты

### Development
- Next.js docs: https://nextjs.org/docs
- Prisma docs: https://www.prisma.io/docs
- Tailwind CSS: https://tailwindcss.com/docs
- shadcn/ui: https://ui.shadcn.com

### Services
- Stripe docs: https://stripe.com/docs
- Vercel: https://vercel.com/docs
- Resend (email): https://resend.com/docs
- Cloudflare: https://developers.cloudflare.com

### Learning Resources
- Web Dev Simplified (YouTube)
- Fireship (YouTube)
- Josh Tried Coding (YouTube)
- Frontend Masters

---

## 🚨 Common Pitfalls to Avoid

1. **Over-engineering MVP**
   - Don't build features you don't need yet
   - Ship fast, iterate based on feedback

2. **Ignoring user feedback**
   - Talk to users weekly
   - Prioritize based on real needs

3. **Poor content quality**
   - Quality > Quantity
   - Test courses with real students first

4. **Neglecting marketing**
   - Start marketing BEFORE launch
   - Consistent content creation

5. **Scaling too early**
   - Get PMF first (100+ happy paying customers)
   - Then scale

6. **Not tracking metrics**
   - If you don't measure, you can't improve
   - Set up analytics from day 1

---

**Последнее обновление:** 28 апреля 2026

*Это живой документ. Обновляйте по мере прогресса проекта.*
