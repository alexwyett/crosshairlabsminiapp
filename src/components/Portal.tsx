import { useState, PropsWithChildren, useEffect } from 'react';
import { createPortal } from 'react-dom';

function createWrapperAndAppendToBody(wrapperId: string) {
  const wrapperElement = document.createElement('div');
  wrapperElement.setAttribute("id", wrapperId);
  document.body.appendChild(wrapperElement);
  return wrapperElement;
}

type PortalProps = {
  wrapperId?: string;
} & PropsWithChildren;

function Portal({ children, wrapperId = 'root' }: PortalProps) {
  const [wrapperElement, setWrapperElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!document) {
      return;
    }
    
    let element = wrapperId ? document.getElementById(wrapperId) : undefined;
    let systemCreated = false;
    // if element is not found with wrapperId or wrapperId is not provided,
    // create and append to body
    if (!element) {
      systemCreated = true;
      element = createWrapperAndAppendToBody('default-portal');
    }

    setWrapperElement(element);
  
    return () => {
      // delete the programatically created element
      if (element && systemCreated && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    }
  }, [wrapperId]);

  // wrapperElement state will be null on very first render.
  if (wrapperElement === null) return null;

  return createPortal(children, wrapperElement);
}

export default Portal;