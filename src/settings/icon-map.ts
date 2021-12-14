import { FunctionalComponent } from 'vue'
import { CloudOutlined } from '@ant-design/icons-vue'

const iconMap: Record<string, FunctionalComponent> = {
  cloud: CloudOutlined
}

export function getIconComponent(key: string) {
  return iconMap[key]
}
