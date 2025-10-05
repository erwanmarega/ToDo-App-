
<template>
 <div class="arc-sidebar">
    <div class="arc-traffic-lights">
      <div class="arc-light arc-light-red"></div>
      <div class="arc-light arc-light-yellow"></div>
      <div class="arc-light arc-light-green"></div>
    </div>

    <div class="arc-profile">
      <div class="arc-avatar">
        <div class="arc-avatar-gradient"></div>
      </div>
    </div>

    <div class="arc-section">
      <div class="arc-section-header-container">
        <svg class="arc-section-icon-folder" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
            <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd"/>
        </svg>
        <div class="arc-section-header">Mes projets</div>
        <svg class="arc-section-icon-add" @click="addItem" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24 ">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v14m-8-7h2m0 0h2m-2 0v2m0-2v-2m12 1h-6m6 4h-6M4 19h16c.5523 0 1-.4477 1-1V6c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z"/>
        </svg>
      </div>
      <div class="arc-tabs">
        <div v-for="item in items" :key="item.id" class="arc-tab-folder">
          <div class="arc-tab-color" :style="{ background: item.color }"></div>
          <div class="arc-tab-content">
            <div class="arc-tab-favicon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path fill-rule="evenodd" d="M3 6a2 2 0 0 1 2-2h5.532a2 2 0 0 1 1.536.72l1.9 2.28H3V6Zm0 3v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9H3Z" clip-rule="evenodd"/>
              </svg>
            </div>
            <input
              v-if="item.isEditing"
              v-model="item.text"
              @blur="finishEditing(item)"
              @keyup.enter="finishEditing(item)"
              class="arc-tab-input"
              ref="editInput"
            />
            <span v-else class="arc-tab-title" @dblclick="startEditing(item)">
              {{ item.text }}
            </span>
            <svg
              class="arc-delete-icon"
              @click="deleteItem(item)"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  
  name: 'Navbar',

  data() {
    return {
      items: [],
      colors: ['#FF6B6B', '#4ECDC4', '#A8E6CF', '#FFD93D', '#6BCF7F', '#4D96FF', '#9B59B6', '#F39C12']
    }
  },

  async mounted() {
    await this.fetchProjects()
  },

  methods: {
    async fetchProjects() {
      try {
        const response = await fetch('http://localhost:3000/api/projects')
        const data = await response.json()

        if (data.success) {
          this.items = data.data.map(project => ({
            id: project._id,
            text: project.name,
            color: project.color,
            isEditing: false,
            description: project.description,
            icon: project.icon
          }))
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error)
      }
    },

    async saveProject(item) {
      try {
        const isNewProject = typeof item.id === 'number'

        if (!isNewProject) {
          console.log('Projet déjà sauvegardé, pas de création')
          return
        }

        const projectData = {
          name: item.text,
          color: item.color,
          description: item.description || '',
          icon: item.icon || '📁'
        }

        const response = await fetch('http://localhost:3000/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(projectData)
        })

        const data = await response.json()

        if (data.success) {
          item.id = data.data._id
          console.log('Projet créé avec succès!')
        } else {
          console.error('Erreur lors de la création:', data.message)
        }
      } catch (error) {
        console.error('Erreur lors de la sauvegarde du projet:', error)
      }
    },

    addItem() {
      const newItem = {
        id: Date.now(), 
        text: 'Nouveau projet',
        isEditing: true,
        color: this.colors[this.items.length % this.colors.length],
        description: '',
        icon: '📁'
      }
      this.items.push(newItem)
      this.$nextTick(() => {
        const inputs = this.$refs.editInput
        if (inputs && inputs.length > 0) {
          inputs[inputs.length - 1].focus()
          inputs[inputs.length - 1].select()
        }
      })
    },

    startEditing(item) {
      item.isEditing = true
      this.$nextTick(() => {
        const inputs = this.$refs.editInput
        if (inputs) {
          const input = Array.isArray(inputs) ? inputs.find(inp => inp) : inputs
          if (input) {
            input.focus()
            input.select()
          }
        }
      })
    },

    async deleteItem(item) {
      try {
        const response = await fetch(`http://localhost:3000/api/projects/${item.id}`, {
          method: 'DELETE'
        })

        const data = await response.json()

        if (data.success) {
          this.items = this.items.filter(i => i.id !== item.id)
          console.log('Projet supprimé avec succès!')
        } else {
          console.error('Erreur lors de la suppression:', data.message)
        }
      } catch (error) {
        console.error('Erreur lors de la suppression du projet:', error)
      }
    },

    async finishEditing(item) {
      if (!item.isEditing) return

      if (item.text.trim() === '') {
        item.text = 'Nouveau projet'
      }
      item.isEditing = false

      await this.saveProject(item)
    }
  }
}


</script>

<style scoped>
.arc-sidebar {
  width: 240px;
  height: 100vh;
  background: #ece3e380;
  display: flex;
  flex-direction: column;
  border-radius: 12px 0 0 12px;
  padding: 8px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: relative;
}

.arc-traffic-lights {
  display: flex;
  gap: 6px;
  padding: 12px 16px 8px;
}

.arc-light {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.arc-light-red {
  background: #ff5f56;
}

.arc-light-yellow {
  background: #ffbd2e;
}

.arc-light-green {
  background: #27ca3f;
}

.arc-light:hover {
  opacity: 0.8;
}

.arc-profile {
  padding: 12px 16px 16px;
}

.arc-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.arc-avatar:hover {
  transform: scale(1.05);
}

.arc-avatar-gradient {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}


.arc-favicon {
  width: 16px;
  height: 16px;
  color: #999;
}

.arc-section {
  flex: 1;
  padding: 12px 0;
}

.arc-section-header-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px 8px;
  margin-bottom: 4px;
}

.arc-section-icon-folder {
  width: 16px;
  height: 16px;
  color: #666;
  flex-shrink: 0;
}

.arc-section-header {
  font-size: 11px;
  font-weight: 600;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  padding: 0;
  margin: 0;
}

.arc-section-icon-add {
  width: 16px;
  height: 16px;
  color: #666;
  margin-left: auto;
  cursor: pointer;
  transition: color 0.2s ease;
}

.arc-section-icon-add:hover {
  color: #999;
}

.arc-tab-folder {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 8px 2px;
  border-radius: 8px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.arc-tab-folder:hover {
  background: #f0f0f0;
}

.arc-tab-input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 13px;
  font-weight: 500;
  color: #000000;
  width: 100%;
  padding: 0;
  font-family: inherit;
}
.arc-tabs {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.arc-tab {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0 8px;
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
  background: transparent;
}

.arc-tab:hover {
  background: #2a2a2a;
}

.arc-tab.router-link-active {
  background: #2a2a2a;
}

.arc-tab.router-link-active .arc-tab-color {
  opacity: 1;
}

.arc-tab-color {
  width: 3px;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.arc-tab-content {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 12px;
  width: 100%;
}

.arc-tab-favicon {
  width: 16px;
  height: 16px;
  color: #999;
  flex-shrink: 0;
}

.arc-tab-title {
  font-size: 13px;
  font-weight: 500;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.arc-delete-icon {
  width: 16px;
  height: 16px;
  color: #999;
  cursor: pointer;
  opacity: 0;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.arc-tab-folder:hover .arc-delete-icon {
  opacity: 1;
}

.arc-delete-icon:hover {
  color: #ff5f56;
}

.arc-tab:hover .arc-tab-title {
  color: #fff;
}

.arc-tab.router-link-active .arc-tab-title {
  color: #fff;
}

.arc-bottom-controls {
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid #2a2a2a;
}

.arc-control-btn {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #666;
}

.arc-control-btn:hover {
  background: #2a2a2a;
  color: #ccc;
}

.arc-control-btn svg {
  width: 16px;
  height: 16px;
}

@media (max-width: 768px) {
  .arc-sidebar {
    width: 60px;
  }

  .arc-section-header,
  .arc-tab-title {
    display: none;
  }

  .arc-tab-content {
    justify-content: center;
    padding: 8px;
  }

  .arc-favorites {
    align-items: center;
  }
}
</style>
