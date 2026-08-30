/**
 * Clean up a scene's materials and geometry
 */
export const cleanScene = scene => {
  if (!scene) return;
  scene.traverse(object => {
    if (!object.isMesh) return;

    if (object.geometry) {
      object.geometry.dispose();
    }

    if (object.material) {
      if (Array.isArray(object.material)) {
        for (const material of object.material) {
          cleanMaterial(material);
        }
      } else if (object.material.isMaterial) {
        cleanMaterial(object.material);
      }
    }
  });
};

/**
 * Clean up and dispose of a material
 */
export const cleanMaterial = material => {
  if (!material) return;
  material.dispose();

  for (const key of Object.keys(material)) {
    const value = material[key];
    if (value && typeof value === 'object' && 'minFilter' in value) {
      value.dispose();
      value.source?.data?.close?.();
    }
  }
};

/**
 * Clean up and dispose of a renderer
 */
export const cleanRenderer = renderer => {
  if (!renderer) return;
  renderer.dispose();
};

/**
 * Clean up lights by removing them from their parent
 */
export const removeLights = lights => {
  if (!lights) return;
  for (const light of lights) {
    if (light && light.parent) {
      light.parent.remove(light);
    }
  }
};

/**
 * Throttle a function call
 */
export function throttle(func, timeFrame) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= timeFrame) {
      func(...args);
      lastTime = now;
    }
  };
}
