"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ArrowLeft, Check, Edit, Play, Tag, X } from "lucide-react"

// Sample data for a specific session
const sessionData = {
  id: 4,
  time: "Today, 10:00:04 AM",
  userId: "user_101",
  sessionLength: "14m 2s",
  country: "United States",
  tags: ["Feature X", "Mobile"],
  notes:
    "User encountered difficulty with the checkout process. They attempted to complete payment 3 times before succeeding. We should investigate the payment validation errors.",
  browser: "Chrome 112.0",
  device: "iPhone 13",
  os: "iOS 16.2",
  referrer: "google.com",
  userAgent:
    "Mozilla/5.0 (iPhone; CPU iPhone OS 16_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.2 Mobile/15E148 Safari/604.1",
}

const availableTags = [
  "UI Bug",
  "Missing Data",
  "Crash",
  "Feature X",
  "Mobile",
  "Desktop",
  "Checkout Flow",
  "Registration",
  "High Priority",
]

export default function SessionDetailPage() {
  const [session, setSession] = useState(sessionData)
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
  const [sessionTags, setSessionTags] = useState(session.tags)
  const [sessionNotes, setSessionNotes] = useState(session.notes)
  const [isEditingNotes, setIsEditingNotes] = useState(false)

  const handleSaveTags = () => {
    setSession({ ...session, tags: sessionTags })
    setIsTagDialogOpen(false)
  }

  const handleSaveNotes = () => {
    setSession({ ...session, notes: sessionNotes })
    setIsEditingNotes(false)
  }

  const toggleTag = (tag: string) => {
    if (sessionTags.includes(tag)) {
      setSessionTags(sessionTags.filter((t) => t !== tag))
    } else {
      setSessionTags([...sessionTags, tag])
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
        <Button variant="ghost" className="mr-2">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sessions
        </Button>
        <h1 className="text-2xl font-semibold">Session Replay</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" />
                Session Recording
              </CardTitle>
              <CardDescription>
                {session.time} • {session.sessionLength}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Video player placeholder */}
              <div className="aspect-video bg-muted rounded-md flex items-center justify-center">
                <p className="text-muted-foreground">Session replay video player</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Notes</CardTitle>
                {!isEditingNotes ? (
                  <Button variant="ghost" size="sm" onClick={() => setIsEditingNotes(true)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSessionNotes(session.notes)
                        setIsEditingNotes(false)
                      }}
                    >
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveNotes}>
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {!isEditingNotes ? (
                <div className="min-h-32 whitespace-pre-wrap">
                  {session.notes || (
                    <p className="text-muted-foreground">
                      No notes added yet. Click Edit to add notes about this session.
                    </p>
                  )}
                </div>
              ) : (
                <Textarea
                  value={sessionNotes}
                  onChange={(e) => setSessionNotes(e.target.value)}
                  placeholder="Add notes about this session..."
                  className="min-h-32"
                />
              )}
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="mb-6">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle>Tags</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsTagDialogOpen(true)}>
                  <Tag className="h-4 w-4 mr-1" />
                  Manage
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {session.tags.length > 0 ? (
                  session.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))
                ) : (
                  <p className="text-muted-foreground">No tags added yet</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="user">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="user">User</TabsTrigger>
                  <TabsTrigger value="technical">Technical</TabsTrigger>
                </TabsList>
                <TabsContent value="user" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">User ID</h4>
                      <p>{session.userId}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Country</h4>
                      <p>{session.country}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Session Duration</h4>
                      <p>{session.sessionLength}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Referrer</h4>
                      <p>{session.referrer}</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="technical" className="pt-4">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Browser</h4>
                      <p>{session.browser}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">Device</h4>
                      <p>{session.device}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">OS</h4>
                      <p>{session.os}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground">User Agent</h4>
                      <p className="text-xs break-all">{session.userAgent}</p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tag Management Dialog */}
      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Tags</DialogTitle>
            <DialogDescription>Add or remove tags to organize this session replay.</DialogDescription>
          </DialogHeader>

          <div className="py-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Current Tags</h4>
              <div className="flex flex-wrap gap-2 min-h-10">
                {sessionTags.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No tags added yet</p>
                ) : (
                  sessionTags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => setSessionTags(sessionTags.filter((t) => t !== tag))}
                      />
                    </Badge>
                  ))
                )}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Available Tags</h4>
              <Command className="border rounded-md">
                <CommandInput placeholder="Search tags..." />
                <CommandList>
                  <CommandEmpty>No tags found.</CommandEmpty>
                  <CommandGroup>
                    {availableTags.map((tag) => (
                      <CommandItem
                        key={tag}
                        onSelect={() => toggleTag(tag)}
                        className="flex items-center justify-between"
                      >
                        <span>{tag}</span>
                        {sessionTags.includes(tag) && <Check className="h-4 w-4" />}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsTagDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveTags}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
