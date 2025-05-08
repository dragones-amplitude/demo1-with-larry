"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { InfoIcon as InfoCircle, Filter, Play, Plus, Tag, X, Check, StickyNote } from "lucide-react"

// Sample data
const sessions = [
  { id: 1, time: "Today, 11:24:53 AM", userId: "user_123", sessionLength: "0s", country: "United States", tags: [] },
  {
    id: 2,
    time: "Today, 11:22:30 AM",
    userId: "user_456",
    sessionLength: "11s",
    country: "United States",
    tags: ["UI Bug"],
  },
  { id: 3, time: "Today, 10:02:37 AM", userId: "user_789", sessionLength: "34s", country: "United States", tags: [] },
  {
    id: 4,
    time: "Today, 10:00:04 AM",
    userId: "user_101",
    sessionLength: "14m 2s",
    country: "United States",
    tags: ["Feature X", "Mobile"],
  },
  { id: 5, time: "Today, 9:34:44 AM", userId: "user_202", sessionLength: "4m 46s", country: "United States", tags: [] },
  {
    id: 6,
    time: "Today, 8:19:43 AM",
    userId: "user_303",
    sessionLength: "2h 40m",
    country: "United States",
    tags: ["Crash"],
  },
  { id: 7, time: "Today, 7:14:55 AM", userId: "user_404", sessionLength: "1s", country: "United States", tags: [] },
  {
    id: 8,
    time: "Today, 7:02:05 AM",
    userId: "user_505",
    sessionLength: "1m 26s",
    country: "United States",
    tags: ["Missing Data"],
  },
  {
    id: 9,
    time: "May 06, 10:11:45 PM",
    userId: "user_606",
    sessionLength: "14m 58s",
    country: "United States",
    tags: [],
  },
  {
    id: 10,
    time: "May 06, 9:26:55 PM",
    userId: "user_707",
    sessionLength: "3m 18s",
    country: "United States",
    tags: ["Feature X"],
  },
]

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

export default function SessionReplaysPage() {
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [filteredSessions, setFilteredSessions] = useState(sessions)
  const [isTagDialogOpen, setIsTagDialogOpen] = useState(false)
  const [selectedSession, setSelectedSession] = useState<any>(null)
  const [sessionTags, setSessionTags] = useState<string[]>([])
  const [sessionNotes, setSessionNotes] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const handleFilterByTags = () => {
    if (selectedTags.length === 0) {
      setFilteredSessions(sessions)
    } else {
      const filtered = sessions.filter((session) => selectedTags.some((tag) => session.tags.includes(tag)))
      setFilteredSessions(filtered)
    }
    setIsFilterOpen(false)
  }

  const handleOpenTagDialog = (session: any) => {
    setSelectedSession(session)
    setSessionTags([...session.tags])
    setSessionNotes("")
    setIsTagDialogOpen(true)
  }

  const handleSaveTags = () => {
    // In a real implementation, this would save to the backend
    setIsTagDialogOpen(false)
  }

  const toggleTag = (tag: string) => {
    if (sessionTags.includes(tag)) {
      setSessionTags(sessionTags.filter((t) => t !== tag))
    } else {
      setSessionTags([...sessionTags, tag])
    }
  }

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            Session Replays
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoCircle className="h-5 w-5 text-muted-foreground" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Unlock qualitative insights by finding the most relevant session replays to watch
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Manage
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <div className="flex border rounded-md overflow-hidden">
          <Button variant="ghost" className="rounded-none px-3 py-1 h-9 border-r">
            1d
          </Button>
          <Button variant="ghost" className="rounded-none px-3 py-1 h-9 border-r bg-muted">
            7d
          </Button>
          <Button variant="ghost" className="rounded-none px-3 py-1 h-9">
            30d
          </Button>
        </div>

        <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Add Filter
              {selectedTags.length > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {selectedTags.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-4">
              <h4 className="font-medium">Filter by Tags</h4>
              <div className="space-y-2">
                {availableTags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`tag-${tag}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedTags([...selectedTags, tag])
                        } else {
                          setSelectedTags(selectedTags.filter((t) => t !== tag))
                        }
                      }}
                    />
                    <label
                      htmlFor={`tag-${tag}`}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tag}
                    </label>
                  </div>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedTags([])
                    setFilteredSessions(sessions)
                    setIsFilterOpen(false)
                  }}
                >
                  Clear
                </Button>
                <Button size="sm" onClick={handleFilterByTags}>
                  Apply
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {selectedTags.length > 0 && (
          <div className="flex items-center gap-1 ml-2">
            {selectedTags.map((tag) => (
              <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                {tag}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => {
                    setSelectedTags(selectedTags.filter((t) => t !== tag))
                    handleFilterByTags()
                  }}
                />
              </Badge>
            ))}
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs"
              onClick={() => {
                setSelectedTags([])
                setFilteredSessions(sessions)
              }}
            >
              Clear all
            </Button>
          </div>
        )}
      </div>

      <div className="border rounded-md">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="text-left p-3 font-medium text-sm">Time</th>
              <th className="text-left p-3 font-medium text-sm flex items-center gap-1">
                User ID
                <InfoCircle className="h-4 w-4 text-muted-foreground" />
              </th>
              <th className="text-left p-3 font-medium text-sm flex items-center gap-1">
                Session Length
                <InfoCircle className="h-4 w-4 text-muted-foreground" />
              </th>
              <th className="text-left p-3 font-medium text-sm">Country</th>
              <th className="text-left p-3 font-medium text-sm">Tags</th>
              <th className="text-left p-3 font-medium text-sm">Notes</th>
              <th className="text-left p-3 font-medium text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredSessions.map((session) => (
              <tr key={session.id} className="border-b hover:bg-muted/50">
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Play className="h-4 w-4 text-primary" />
                    {session.time}
                  </div>
                </td>
                <td className="p-3">{session.userId}</td>
                <td className="p-3">{session.sessionLength}</td>
                <td className="p-3">
                  <div className="flex items-center gap-1">
                    <span className="inline-block w-4 h-3 bg-[url('/placeholder.svg?height=12&width=18')]"></span>
                    {session.country}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {session.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full"
                      onClick={() => handleOpenTagDialog(session)}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </td>
                <td className="p-3">
                  <Button variant="ghost" size="sm" className="h-7 px-2" onClick={() => handleOpenTagDialog(session)}>
                    <StickyNote className="h-4 w-4 mr-1" />
                    Add note
                  </Button>
                </td>
                <td className="p-3">
                  <Button variant="ghost" size="sm" className="h-7" onClick={() => handleOpenTagDialog(session)}>
                    <Tag className="h-4 w-4 mr-1" />
                    Tag
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isTagDialogOpen} onOpenChange={setIsTagDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Manage Session</DialogTitle>
            <DialogDescription>Add tags and notes to organize and annotate this session replay.</DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="tags" className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="tags">Tags</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>
            <TabsContent value="tags" className="mt-4">
              <div className="space-y-4">
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
                  <h4 className="text-sm font-medium mb-2">Add Tags</h4>
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

                  <div className="mt-4">
                    <div className="flex items-center gap-2">
                      <Input placeholder="Create new tag" className="flex-1" />
                      <Button size="sm">Add</Button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="notes" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Session Notes</h4>
                  <Textarea
                    placeholder="Add notes about this session replay..."
                    className="min-h-32"
                    value={sessionNotes}
                    onChange={(e) => setSessionNotes(e.target.value)}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-4">
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
