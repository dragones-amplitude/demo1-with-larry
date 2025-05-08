"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Edit, Trash, Plus, ArrowLeftRight } from "lucide-react"

// Sample data
const initialTags = [
  { id: 1, name: "UI Bug", count: 24, createdBy: "admin@example.com", createdAt: "2025-04-10" },
  { id: 2, name: "Missing Data", count: 18, createdBy: "admin@example.com", createdAt: "2025-04-10" },
  { id: 3, name: "Crash", count: 12, createdBy: "user@example.com", createdAt: "2025-04-15" },
  { id: 4, name: "Feature X", count: 35, createdBy: "admin@example.com", createdAt: "2025-04-12" },
  { id: 5, name: "Mobile", count: 42, createdBy: "user@example.com", createdAt: "2025-04-18" },
  { id: 6, name: "Desktop", count: 29, createdBy: "admin@example.com", createdAt: "2025-04-20" },
  { id: 7, name: "Checkout Flow", count: 15, createdBy: "user@example.com", createdAt: "2025-04-22" },
  { id: 8, name: "Registration", count: 8, createdBy: "admin@example.com", createdAt: "2025-04-25" },
  { id: 9, name: "High Priority", count: 11, createdBy: "user@example.com", createdAt: "2025-04-28" },
]

export default function TagManagementPage() {
  const [tags, setTags] = useState(initialTags)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isMergeDialogOpen, setIsMergeDialogOpen] = useState(false)
  const [newTagName, setNewTagName] = useState("")
  const [editingTag, setEditingTag] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<number[]>([])
  const [mergeTargetTag, setMergeTargetTag] = useState<number | null>(null)

  const filteredTags = tags.filter((tag) => tag.name.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddTag = () => {
    if (newTagName.trim()) {
      const newTag = {
        id: tags.length + 1,
        name: newTagName.trim(),
        count: 0,
        createdBy: "current@user.com",
        createdAt: new Date().toISOString().split("T")[0],
      }
      setTags([...tags, newTag])
      setNewTagName("")
      setIsAddDialogOpen(false)
    }
  }

  const handleEditTag = () => {
    if (editingTag && editingTag.name.trim()) {
      setTags(tags.map((tag) => (tag.id === editingTag.id ? { ...tag, name: editingTag.name } : tag)))
      setIsEditDialogOpen(false)
    }
  }

  const handleDeleteTag = (id: number) => {
    setTags(tags.filter((tag) => tag.id !== id))
  }

  const handleMergeTags = () => {
    if (mergeTargetTag !== null && selectedTags.length > 0) {
      // In a real implementation, this would merge tags and update sessions
      const targetTag = tags.find((tag) => tag.id === mergeTargetTag)
      if (targetTag) {
        // Remove merged tags and update count for target tag
        const mergedCount = selectedTags.reduce((total, id) => {
          const tag = tags.find((t) => t.id === id)
          return total + (tag?.count || 0)
        }, 0)

        setTags(
          tags
            .filter((tag) => !selectedTags.includes(tag.id))
            .map((tag) => (tag.id === mergeTargetTag ? { ...tag, count: tag.count + mergedCount } : tag)),
        )

        setSelectedTags([])
        setMergeTargetTag(null)
        setIsMergeDialogOpen(false)
      }
    }
  }

  const toggleTagSelection = (id: number) => {
    if (selectedTags.includes(id)) {
      setSelectedTags(selectedTags.filter((tagId) => tagId !== id))
    } else {
      setSelectedTags([...selectedTags, id])
    }
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Tag Management</h1>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsMergeDialogOpen(true)}
            disabled={selectedTags.length < 2}
            className="flex items-center gap-2"
          >
            <ArrowLeftRight className="h-4 w-4" />
            Merge Tags
          </Button>
          <Button onClick={() => setIsAddDialogOpen(true)} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Tag
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Total Tags</CardTitle>
            <CardDescription>Across all sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tags.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Tagged Sessions</CardTitle>
            <CardDescription>Sessions with at least one tag</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{tags.reduce((sum, tag) => sum + tag.count, 0)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Most Used Tag</CardTitle>
            <CardDescription>Highest usage across sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold">
                {tags.length > 0
                  ? tags.reduce((max, tag) => (tag.count > max.count ? tag : max), tags[0]).name
                  : "None"}
              </p>
              <Badge variant="secondary" className="ml-2">
                {tags.length > 0 ? tags.reduce((max, tag) => (tag.count > max.count ? tag : max), tags[0]).count : 0}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Input
          placeholder="Search tags..."
          className="max-w-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-2">
          {selectedTags.length > 0 && (
            <p className="text-sm text-muted-foreground">{selectedTags.length} tags selected</p>
          )}
        </div>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Tag Name</TableHead>
              <TableHead>Usage Count</TableHead>
              <TableHead>Created By</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTags.map((tag) => (
              <TableRow key={tag.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => toggleTagSelection(tag.id)}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                </TableCell>
                <TableCell className="font-medium">{tag.name}</TableCell>
                <TableCell>{tag.count}</TableCell>
                <TableCell>{tag.createdBy}</TableCell>
                <TableCell>{tag.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingTag(tag)
                        setIsEditDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteTag(tag.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Add Tag Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Tag</DialogTitle>
            <DialogDescription>Create a new tag to organize session replays.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input placeholder="Enter tag name" value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddTag}>Add Tag</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Tag Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Tag</DialogTitle>
            <DialogDescription>Update the tag name.</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Enter tag name"
              value={editingTag?.name || ""}
              onChange={(e) => setEditingTag({ ...editingTag, name: e.target.value })}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditTag}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Merge Tags Dialog */}
      <Dialog open={isMergeDialogOpen} onOpenChange={setIsMergeDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Merge Tags</DialogTitle>
            <DialogDescription>Select a target tag to merge the selected tags into.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Selected Tags to Merge</h4>
              <div className="flex flex-wrap gap-2">
                {selectedTags.map((id) => {
                  const tag = tags.find((t) => t.id === id)
                  return tag ? (
                    <Badge key={id} variant="secondary">
                      {tag.name}
                    </Badge>
                  ) : null
                })}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Target Tag</h4>
              <select
                className="w-full p-2 border rounded-md"
                value={mergeTargetTag || ""}
                onChange={(e) => setMergeTargetTag(Number(e.target.value))}
              >
                <option value="">Select target tag</option>
                {tags
                  .filter((tag) => !selectedTags.includes(tag.id))
                  .map((tag) => (
                    <option key={tag.id} value={tag.id}>
                      {tag.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMergeDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleMergeTags} disabled={mergeTargetTag === null}>
              Merge Tags
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
