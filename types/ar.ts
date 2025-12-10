import type * as THREE from 'three'

/**
 * AR session state enumeration
 */
export enum ARSessionState {
  INACTIVE = 'inactive',
  STARTING = 'starting',
  ACTIVE = 'active',
  ENDING = 'ending',
  ERROR = 'error'
}

/**
 * Object placement state during AR session
 */
export enum PlacementState {
  SEARCHING = 'searching',    // Looking for surface
  READY = 'ready',            // Surface found, ready to place
  PLACED = 'placed',          // Object has been placed
  MOVING = 'moving'           // Object is being repositioned
}

/**
 * AR placement transform data
 */
export interface ARPlacement {
  /** Position in 3D space */
  position: THREE.Vector3

  /** Rotation quaternion */
  rotation: THREE.Quaternion

  /** Scale factor */
  scale: THREE.Vector3

  /** Timestamp of placement */
  timestamp: number
}

/**
 * WebXR support status
 */
export interface WebXRSupport {
  /** Whether WebXR API is available */
  isSupported: boolean

  /** Whether AR mode is supported */
  isARSupported: boolean

  /** Error message if not supported */
  errorMessage?: string
}

/**
 * AR session configuration
 */
export interface ARSessionConfig {
  /** Required features for the AR session */
  requiredFeatures: XRSessionMode[]

  /** Optional features for the AR session */
  optionalFeatures: XRSessionMode[]

  /** DOM overlay element for UI during AR */
  domOverlay?: HTMLElement
}

/**
 * Touch gesture data for interactions
 */
export interface TouchGestureData {
  /** Type of gesture detected */
  type: 'tap' | 'drag' | 'pinch'

  /** Delta values for drag/pinch */
  deltaX?: number
  deltaY?: number

  /** Pinch scale factor */
  scale?: number

  /** Touch point positions */
  touches: Array<{ x: number; y: number }>
}

/**
 * Model loading progress
 */
export interface ModelLoadProgress {
  /** Loading state */
  loading: boolean

  /** Progress percentage (0-100) */
  progress: number

  /** Error message if loading failed */
  error?: string

  /** Loaded model reference */
  model?: THREE.Group
}
