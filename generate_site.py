import re
import os

with open('saved_resource.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# 1. Fix missing image
html = html.replace('./rocket_gen_img_18c6e917b-1772130764890.png', './rocket_gen_img_16ec88284-1772880754748.png')

# 2. Fix external preview URLs
html = html.replace('https://omwmotions-gdfm-local.rocketpreview.app/#work', '#work')
html = html.replace('https://omwmotions-gdfm-local.rocketpreview.app/', '#hero')

# 3. Clean up Next.js image optimizer srcsets
html = re.sub(r'srcset=\"/_next/image[^\"]*\"', '', html)

# 4. Remove Next.js script payload at the bottom
pos_scripts = html.find('<!--$--><!--/$--><script')
if pos_scripts != -1:
    body_part = html[:pos_scripts]
else:
    pos_scripts2 = html.find('<script src="./webpack-')
    if pos_scripts2 != -1:
        body_part = html[:pos_scripts2]
    else:
        body_part = html

# 5. Extract body content
body_match = re.search(r'<body[^>]*>(.*)', body_part, re.DOTALL)
body_content = body_match.group(1) if body_match else ''

# Remove leftover Next.js scripts and comments
body_content = re.sub(r'<script.*?</script>', '', body_content, flags=re.DOTALL)
body_content = re.sub(r'<next-route-announcer.*?</next-route-announcer>', '', body_content, flags=re.DOTALL)
body_content = re.sub(r'<!--.*?-->', '', body_content, flags=re.DOTALL)

# Add data-reveal to animated containers that had inline opacity:0
# First, let's normalize reveal wrappers
body_content = re.sub(
    r'style=\"([^\"]*?)opacity:\s*0;\s*transform:\s*translateY\(([0-9]+)px\)(;[^\"]*)?\"',
    r'class="reveal-on-scroll" style="\1\3"',
    body_content
)

body_content = re.sub(
    r'style=\"([^\"]*?)opacity:\s*0;\s*transform:\s*translateX\(([0-9\-]+)px\)(;[^\"]*)?\"',
    r'class="reveal-on-scroll" style="\1\3"',
    body_content
)

# Replace remaining static opacity: 0 on project-card-wrapper
body_content = re.sub(
    r'class=\"project-card-wrapper([^\"]*)\"\s*style=\"opacity:\s*0;\s*transform:\s*translateY\([0-9]+px\);\"',
    r'class="project-card-wrapper\1 reveal-on-scroll"',
    body_content
)

# Ensure disabled attribute is removed from contact submit button
body_content = re.sub(r'(<button[^>]*type=\"submit\"[^>]*)disabled=\"\"', r'\1', body_content)

# Add Lightbox Modal and Toast container HTML before </div> ending .grain
modal_html = """
<!-- Project & Reel Lightbox Modal -->
<div id="project-modal" class="project-modal-overlay" style="display:none; opacity:0;" aria-hidden="true" role="dialog" aria-modal="true">
  <div class="project-modal-backdrop" onclick="closeProjectModal()"></div>
  <div class="project-modal-content">
    <button class="project-modal-close" onclick="closeProjectModal()" aria-label="Close modal">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"></path></svg>
    </button>
    <div class="project-modal-media">
      <img id="modal-img" src="" alt="Project frame" class="project-modal-image">
      <div class="project-modal-play-badge">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="6 4 20 12 6 20 6 4"></polygon></svg>
      </div>
    </div>
    <div class="project-modal-details">
      <div class="flex items-center justify-between gap-4 mb-2">
        <span id="modal-category" class="text-label text-accent tracking-widest block"></span>
        <span id="modal-year" class="text-label-sm text-muted-foreground"></span>
      </div>
      <h3 id="modal-title" class="text-foreground font-bold text-2xl md:text-3xl mb-3 tracking-tight"></h3>
      <p id="modal-desc" class="text-muted-foreground text-sm leading-relaxed mb-6 font-light"></p>
      
      <div class="grid grid-cols-2 gap-4 border-y border-border py-4 mb-6">
        <div>
          <span class="text-label-sm text-muted-foreground block mb-1">CAMERA / SENSOR</span>
          <span id="modal-camera" class="text-xs text-foreground font-mono">RED V-RAPTOR 8K VV</span>
        </div>
        <div>
          <span class="text-label-sm text-muted-foreground block mb-1">OPTICS / LENSES</span>
          <span id="modal-lenses" class="text-xs text-foreground font-mono">COOKE ANAMORPHIC /i</span>
        </div>
        <div>
          <span class="text-label-sm text-muted-foreground block mb-1">LOCATION</span>
          <span id="modal-location" class="text-xs text-foreground font-mono">INDIA</span>
        </div>
        <div>
          <span class="text-label-sm text-muted-foreground block mb-1">COLOR GRADE</span>
          <span class="text-xs text-foreground font-mono">DAVINCI KODAK 2383</span>
        </div>
      </div>
      
      <div class="flex flex-wrap items-center gap-4">
        <a id="modal-drive-link" href="https://drive.google.com/drive/folders/1P1UV3Ld7vzgbVxGsujlcVGUK-kLLctnl?usp=sharing" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 bg-accent text-background px-6 py-3 text-label font-bold tracking-widest hover:opacity-90 transition-opacity">
          <span>WATCH 4K MASTER REEL</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"></path></svg>
        </a>
        <a href="https://wa.me/919660845727" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 border border-border hover:border-accent text-foreground px-5 py-3 text-label tracking-widest transition-colors">
          <span>INQUIRE ABOUT SIMILAR PROJECT</span>
        </a>
      </div>
    </div>
  </div>
</div>

<!-- Toast Notification System -->
<div id="toast-container" class="toast-container" aria-live="polite"></div>
"""

# Insert modal before closing </div>
body_content = body_content.rstrip()
if body_content.endswith('</div>'):
    body_content = body_content[:-6] + modal_html + '</div>'
else:
    body_content = body_content + modal_html

# Build final index.html
index_html = f"""<!DOCTYPE html>
<html lang="en" class="__variable_6b03d3 __variable_898c26">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>OM W MOTIONS — Cinematographer OM Vaisnav</title>
  <meta name="description" content="OM Vaisnav is a cinematographer crafting commercial, narrative, documentary, and music video films. Available for premium visual projects worldwide.">
  
  <!-- Open Graph / Social Meta -->
  <meta property="og:title" content="OM W MOTIONS — Cinematographer OM Vaisnav">
  <meta property="og:description" content="Cinematic visual storytelling by OM Vaisnav. Commercial, narrative, documentary, and music video films.">
  <meta property="og:image" content="./app_logo.png">
  <meta property="og:type" content="website">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="OM W MOTIONS — Cinematographer">
  <meta name="twitter:description" content="Cinematic visual storytelling by OM Vaisnav.">
  <meta name="twitter:image" content="./app_logo.png">
  
  <link rel="icon" href="./app_logo.png" type="image/png">

  <!-- Google Fonts: Manrope & JetBrains Mono -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Manrope:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  
  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="./75df4e1a70dfdb7a.css">
  <link rel="stylesheet" href="./custom.css">
</head>
<body class="__className_6b03d3">
{body_content}
  <!-- Main Interactivity Script -->
  <script src="./main.js"></script>
</body>
</html>"""

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(index_html)

print("Successfully generated index.html!")
