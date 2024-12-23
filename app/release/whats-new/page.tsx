import {
  Globe,
  Search,
  MessageSquare,
  Palette,
  Languages,
  Brain,
  ArrowUpRight,
} from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function WhatsNew() {
  const features = [
    {
      icon: Globe,
      title: '80+ Language Support',
      description:
        'Express yourself in your native language! Mood AI Journal now detects and responds in over 80 languages, ensuring a truly global experience.',
    },
    {
      icon: Search,
      title: 'Powerful Search',
      description:
        'Easily find your past entries! Search journal entries by mood, emotion, sentiment score, and subject.',
    },
    {
      icon: MessageSquare,
      title: 'AI-Powered Chat',
      description:
        'Meet your personal journal assistant! Chat with an AI that knows your entries and can offer personalized insights and interactions.',
    },
    {
      icon: Palette,
      title: 'Revamped Design',
      description:
        'Experience our new fancy landing page with animations for a visually stunning first impression.',
    },
    {
      icon: Languages,
      title: 'Dynamic Language Interaction',
      description:
        'Type in any of our supported 80+ languages, and Mood AI Journal responds in your preferred language—seamlessly!',
    },
    {
      icon: Brain,
      title: 'Actionable Insights',
      description:
        'Receive tailored recommendations based on your mood to help guide your day.',
    },
    {
      icon: ArrowUpRight,
      title: 'Next.js Upgrade',
      description:
        'Enjoy faster, more secure performance with the latest version of Next.js (v14.2.21).',
    },
  ]

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-center text-5xl font-bold text-primary">
          What's New in Mood AI Journal? 🚀
        </h1>
        <p className="mb-12 text-center text-xl text-muted-foreground">
          Version 2 is here with groundbreaking updates to elevate your
          journaling experience! Check out the highlights:
        </p>

        <div className="grid gap-8 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-primary">
                  <feature.icon className="mr-2 h-6 w-6" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
