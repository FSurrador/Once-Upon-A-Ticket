/* ------------------------------------------------ *
 * The MIT License (MIT)
 * Copyright (c) 2020 terryky1220@gmail.com
 * ------------------------------------------------ */
//tf.setBackend('wasm').then(() => startWebGL());

let s_debug_log;
let s_is_dragover = false;
let s_drop_files = [];
let s_rtarget_main;
let s_rtarget_feed;
let s_rtarget_src;
let s_portrait_input_normalize_param = {};

class GuiProperty {
    constructor() {
        this.input_range   = 2.0;
        this.use_camera    = false;
        this.flip_horizontal = true;
        this.draw_roi_rect = false;
        this.draw_pmeter   = false;
    }
}
const s_gui_prop = new GuiProperty();

function init_stats ()
{
    var stats = new Stats();
    var xPanel = stats.addPanel( new Stats.Panel( 'x', '#ff8', '#221' ) );
    var yPanel = stats.addPanel( new Stats.Panel( 'y', '#f8f', '#212' ) );
    stats.showPanel( 0 );
    document.body.appendChild( stats.dom );

    return stats;
}


function generate_detect_input_image (gl, texid, win_w, win_h)
{
    let dims = get_face_detect_input_dims ();
    let buf_rgba = new Uint8Array (dims.w * dims.h * 4);
    let buf_rgb  = new Uint8Array (dims.w * dims.h * 3);


    GLUtil.set_render_target (gl, s_rtarget_feed);
    gl.clear (gl.COLOR_BUFFER_BIT);
    r2d.draw_2d_texture (gl, texid, 0, win_h - dims.h, dims.w, dims.h, 1);

    gl.readPixels (0, 0, dims.w, dims.h, gl.RGBA, gl.UNSIGNED_BYTE, buf_rgba);
    for (let i = 0, j = 0; i < buf_rgba.length; i ++)
    {
        if (i % 4 != 3)
            buf_rgb[j++] = buf_rgba[i];
    }

    GLUtil.set_render_target (gl, s_rtarget_main);

    return buf_rgb;
}

function
generate_portrait_input_image (gl, texid, win_w, win_h, detection, face_id)
{
    let dims = get_face_portrait_input_dims ();
    let buf_rgba = new Uint8Array (dims.w * dims.h * 4);
    let buf_rgb  = new Uint8Array (dims.w * dims.h * 3);
    let buf_rgb_f= new Float32Array (dims.w * dims.h * 3);
    let max_val = 0;

    let texcoord = [];

    if (detection.length > face_id)
    {
        region = detection[face_id];
        let x0 = region.roi_coord[0].x;
        let y0 = region.roi_coord[0].y;
        let x1 = region.roi_coord[1].x; //    0--------1
        let y1 = region.roi_coord[1].y; //    |        |
        let x2 = region.roi_coord[2].x; //    |        |
        let y2 = region.roi_coord[2].y; //    3--------2
        let x3 = region.roi_coord[3].x;
        let y3 = region.roi_coord[3].y;
        texcoord[0] = x3;   texcoord[1] = y3;
        texcoord[2] = x0;   texcoord[3] = y0;
        texcoord[4] = x2;   texcoord[5] = y2;
        texcoord[6] = x1;   texcoord[7] = y1;
    }

    GLUtil.set_render_target (gl, s_rtarget_feed);
    gl.clear (gl.COLOR_BUFFER_BIT);

    r2d.draw_2d_texture_texcoord_rot (gl, texid, 0, win_h - dims.h, dims.w, dims.h, texcoord, 0, 0, 0);

    gl.readPixels (0, 0, dims.w, dims.h, gl.RGBA, gl.UNSIGNED_BYTE, buf_rgba);
    for (let i = 0, j = 0; i < buf_rgba.length; i ++)
    {
        if (i % 4 != 3)
        {
            buf_rgb[j++] = buf_rgba[i];

            if (buf_rgba[i] > max_val)
                max_val = buf_rgba[i];
        }
    }

    if (true)
    {
        for (let i = 0; i < buf_rgb.length/3; i++)
        {
            let r = buf_rgb[3 * i + 0];
            let g = buf_rgb[3 * i + 1];
            let b = buf_rgb[3 * i + 2];

            r /= 255.0;
            g /= 255.0;
            b /= 255.0;
            r = (r - 0.5) * 2.0;
            g = (g - 0.5) * 2.0;
            b = (b - 0.5) * 2.0;

            buf_rgb_f[3 * i + 0] = r * s_gui_prop.input_range;
            buf_rgb_f[3 * i + 1] = g * s_gui_prop.input_range;
            buf_rgb_f[3 * i + 2] = b * s_gui_prop.input_range;
        }
    }
    else
    {
        /* 
         * normalize input image based on
         *   https://github.com/NathanUA/U-2-Net/blob/master/u2net_portrait_demo.py
         */
        for (let i = 0; i < buf_rgb.length/3; i++)
        {
            let r = buf_rgb[3 * i + 0];
            let g = buf_rgb[3 * i + 1];
            let b = buf_rgb[3 * i + 2];

            r /= max_val;
            g /= max_val;
            b /= max_val;
            r = (r - 0.406) / 0.225;
            g = (g - 0.456) / 0.224;
            b = (b - 0.485) / 0.229;

            buf_rgb_f[3 * i + 0] = r * s_gui_prop.input_range;
            buf_rgb_f[3 * i + 1] = g * s_gui_prop.input_range;
            buf_rgb_f[3 * i + 2] = b * s_gui_prop.input_range;
        }
    }

    GLUtil.set_render_target (gl, s_rtarget_main);

    return buf_rgb_f;
}


function
render_detect_region (gl, ofstx, ofsty, texw, texh, detection)
{
    let col_white = [1.0, 1.0, 1.0, 1.0];
    let col_red   = [1.0, 0.0, 0.0, 1.0];
    let col_frame = [1.0, 0.0, 0.0, 1.0];

    for (let i = 0; i < detection.length; i ++)
    {
        region = detection[i];
        let x1 = region.topleft.x  * texw + ofstx;
        let y1 = region.topleft.y  * texh + ofsty;
        let x2 = region.btmright.x * texw + ofstx;
        let y2 = region.btmright.y * texh + ofsty;
        let score = region.score;

        /* rectangle region */
        r2d.draw_2d_rect (gl, x1, y1, x2-x1, y2-y1, col_frame, 2.0);

        /* score */
        let buf = "" + (score * 100).toFixed(0);
        dbgstr.draw_dbgstr_ex (gl, buf, x1, y1, 1.0, col_white, col_frame);

        /* key points */
        for (let j0 = 0; j0 < kFaceKeyNum; j0 ++)
        {
            let x = region.keys[j0].x * texw + ofstx;
            let y = region.keys[j0].y * texh + ofsty;

            r = 4;
            r2d.draw_2d_fillrect (gl, x - (r/2), y - (r/2), r, r, col_red);
        }

        /* ROI region */
        for (let j0 = 0; j0 < 4; j0 ++)
        {
            let j1 = (j0 + 1) % 4;
            let x1 = region.roi_coord[j0].x * texw + ofstx;
            let y1 = region.roi_coord[j0].y * texh + ofsty;
            let x2 = region.roi_coord[j1].x * texw + ofstx;
            let y2 = region.roi_coord[j1].y * texh + ofsty;

            r2d.draw_2d_line (gl, x1, y1, x2, y2, col_red, 2.0);
        }
    }
}



function
render_cropped_face_image (gl, srctex, ofstx, ofsty, texw, texh, detection, face_id)
{
    let texcoord = [];

    if (detection.length <= face_id)
        return;

    region = detection[face_id];
    let x0 = region.roi_coord[0].x;
    let y0 = region.roi_coord[0].y;
    let x1 = region.roi_coord[1].x; //    0--------1
    let y1 = region.roi_coord[1].y; //    |        |
    let x2 = region.roi_coord[2].x; //    |        |
    let y2 = region.roi_coord[2].y; //    3--------2
    let x3 = region.roi_coord[3].x;
    let y3 = region.roi_coord[3].y;
    texcoord[0] = x0;   texcoord[1] = y0;
    texcoord[2] = x3;   texcoord[3] = y3;
    texcoord[4] = x1;   texcoord[5] = y1;
    texcoord[6] = x2;   texcoord[7] = y2;

    r2d.draw_2d_texture_texcoord_rot (gl, srctex, ofstx, ofsty, texw, texh, texcoord, 0, 0, 0);
}

function clamp(min, max, val) {
    return Math.min(Math.max(min, +val), max);
}

function
render_portrait_face_image (gl, ofstx, ofsty, texw, texh, detection, face_id, portrait_ret)
{
    if (detection.length <= face_id)
        return;

    let segmap   = portrait_ret.portrait;
    let segmap_w = portrait_ret.portrait_dims[0];
    let segmap_h = portrait_ret.portrait_dims[1];
    let imgbuf = new Uint8Array (segmap_h * segmap_w * 4);

    let alpha = 255;

    /* find the min/max value for normalization. */
    let colmax = -Number.MAX_VALUE;
    let colmin =  Number.MAX_VALUE;
    for (let y = 0; y < segmap_h; y ++)
    {
        for (let x = 0; x < segmap_w; x ++)
        {
            let val = segmap[y * segmap_w + x];
            if (val > colmax) colmax = val;
            if (val < colmin) colmin = val;
        }
    }

    for (let y = 0; y < segmap_h; y ++)
    {
        for (let x = 0; x < segmap_w; x ++)
        {
            let val = segmap[y * segmap_w + x];

            val = (val - colmin) / (colmax - colmin);
            val = clamp (0.0, 1.0, val);
            val = 1.0 - val;
            val *= 255;
            let idx = 4 * (y * segmap_w + x);
            imgbuf[idx + 0] = val;
            imgbuf[idx + 1] = val;
            imgbuf[idx + 2] = val;
            imgbuf[idx + 3] = alpha;
        }
    }

    let region = detection[face_id];
    let cx     = region.roi_center.x * texw; //    0--------1
    let cy     = region.roi_center.y * texh; //    |        |
    let face_w = region.roi_size.x   * texw; //    |        |
    let face_h = region.roi_size.y   * texh; //    3--------2
    let bx     = cx - face_w * 0.5;
    let by     = cy - face_h * 0.5;
    let rot    = RAD_TO_DEG (region.rotation);

    let texid = GLUtil.create_2d_texture (gl, imgbuf, segmap_w, segmap_h);
    r2d.draw_2d_texture_texcoord_rot (gl, texid, ofstx + bx, ofsty + by, face_w, face_h, 0, 0.5, 0.5, rot);

    gl.deleteTexture (texid);
}




/* Adjust the texture size to fit the window size
 *
 *                      Portrait
 *     Landscape        +------+
 *     +-+------+-+     +------+
 *     | |      | |     |      |
 *     | |      | |     |      |
 *     +-+------+-+     +------+
 *                      +------+
 */
function
generate_squared_src_image (gl, texid, src_w, src_h, win_w, win_h)
{
    let win_aspect = win_w / win_h;
    let tex_aspect = src_w / src_h;
    let scale;
    let scaled_w, scaled_h;
    let offset_x, offset_y;

    if (win_aspect > tex_aspect)
    {
        scale = win_h / src_h;
        scaled_w = scale * src_w;
        scaled_h = scale * src_h;
        offset_x = (win_w - scaled_w) * 0.5;
        offset_y = 0;
    }
    else
    {
        scale = win_w / src_w;
        scaled_w = scale * src_w;
        scaled_h = scale * src_h;
        offset_x = 0;
        offset_y = (win_h - scaled_h) * 0.5;
    }

    GLUtil.set_render_target (gl, s_rtarget_src);
    gl.clearColor (0.7, 0.7, 0.7, 1.0);
    gl.clear (gl.COLOR_BUFFER_BIT);

    let flip = r2d.FLIP_V;
    flip |= s_gui_prop.flip_horizontal ? r2d.FLIP_H : 0
    r2d.draw_2d_texture (gl, texid, offset_x, offset_y, scaled_w, scaled_h, flip)
}


function
init_gui ()
{
    const gui = new dat.GUI();

    gui.add (s_gui_prop, 'input_range', 0.0, 10.0);
    gui.add (s_gui_prop, 'use_camera');
    gui.add (s_gui_prop, 'flip_horizontal');
    gui.add (s_gui_prop, 'draw_roi_rect');
    gui.add (s_gui_prop, 'draw_pmeter');
}


/* ---------------------------------------------------------------- *
 *  Drag and Drop Event
 * ---------------------------------------------------------------- */
function on_dragover (event)
{
    event.preventDefault();
    s_is_dragover = true;
}

function on_dragleave (event)
{
    event.preventDefault();
    s_is_dragover = false;
}

function on_drop (event)
{
    event.preventDefault();
    s_is_dragover = false;
    s_drop_files = event.dataTransfer.files;
}


function on_webglcontextlost (event)
{
    //event.preventDefault();
    alert ("[ERROR]\nCONTEXT_LOST_WEBGL has occurred. \norz...");
}

/* ---------------------------------------------------------------- *
 *      M A I N    F U N C T I O N
 * ---------------------------------------------------------------- */
async function startWebGL()
{
    s_debug_log = document.getElementById('debug_log');

    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');
    if (!gl)
    {
        alert('Failed to initialize WebGL.');
        return;
    }

    gl.clearColor (0.7, 0.7, 0.7, 1.0);
    gl.clear (gl.COLOR_BUFFER_BIT);

    canvas.addEventListener ('dragover',  on_dragover);
    canvas.addEventListener ('dragleave', on_dragleave);
    canvas.addEventListener ('drop' ,     on_drop);
    canvas.addEventListener ('webglcontextlost', on_webglcontextlost);

    init_gui ();

    //const camtex = GLUtil.create_camera_texture (gl);
    //const camtex = GLUtil.create_video_texture (gl, "pexels.mp4");
    let camtex = {};
    imgtex = GLUtil.create_image_texture2 (gl, "pakutaso.jpg");

    let need_camera_init = true;
    let imgtex_next = imgtex;

    let win_w = canvas.clientWidth;
    let win_h = canvas.clientHeight;

    r2d.init_2d_render (gl, win_w, win_h);
    init_dbgstr (gl, win_w, win_h);
    pmeter.init_pmeter (gl, win_w, win_h, win_h - 40);
    const stats = init_stats ();


    await init_tfjs_face_portrait ();
    s_debug_log.innerHTML = "tfjs.Backend = " + tf.getBackend() + "<br>"

    s_rtarget_main = GLUtil.create_render_target (gl, win_w, win_h, 0);
    s_rtarget_feed = GLUtil.create_render_target (gl, win_w, win_w, 1);
    s_rtarget_src  = GLUtil.create_render_target (gl, win_w, win_w, 1);

    /* stop loading spinner */
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');

    let prev_time_ms = performance.now();
    let need_invoke_tflite = false;
    let req_update_image  = true;
    let req_prologue = 10;
    let time_invoke0 = 0;
    let time_invoke1 = 0;
    let detections = {};
    let portraits = [];
    async function render (now)
    {
        pmeter.reset_lap (0);
        pmeter.set_lap (0);

        let cur_time_ms = performance.now();
        let interval_ms = cur_time_ms - prev_time_ms;
        prev_time_ms = cur_time_ms;

        if (s_gui_prop.use_camera & need_camera_init)
        {
            camtex = GLUtil.create_camera_texture (gl);
            need_camera_init = false;
        }

        stats.begin();

        let src_w = imgtex.image.width;
        let src_h = imgtex.image.height;
        let texid = imgtex.texid;
        if (GLUtil.is_camera_ready(camtex) && s_gui_prop.use_camera)
        {
            GLUtil.update_camera_texture (gl, camtex);
            src_w = camtex.video.videoWidth;
            src_h = camtex.video.videoHeight;
            texid = camtex.texid;
            need_invoke_tflite = true;
        }

        if (s_drop_files.length > 0)
        {
            imgtex_next = GLUtil.create_image_texture_from_file (gl, s_drop_files[0]);
            s_drop_files = [];
            req_update_image = true;
        }

        if (req_update_image && GLUtil.is_image_texture_ready (imgtex_next))
        {
            imgtex = imgtex_next;
            req_update_image  = false;
            req_prologue = 10;
            detections.length = 0;
        }

        generate_squared_src_image (gl, texid, src_w, src_h, win_w, win_h);
        texid = s_rtarget_src.texid;

        if (need_invoke_tflite)
        {
            /* --------------------------------------- *
             *  invoke TF.js (Face detection)
             * --------------------------------------- */
            let feed_image = generate_detect_input_image (gl, texid, win_w, win_h);

            let time_invoke0_start = performance.now();
            detections = await invoke_pose_detect (feed_image);
            time_invoke0 = performance.now() - time_invoke0_start;

            /* --------------------------------------- *
             *  invoke TF.js (Face portrait)
             * --------------------------------------- */
            time_invoke1 = 0;
            for (let face_id = 0; face_id < detections.length; face_id ++)
            {
                let feed_image = generate_portrait_input_image (gl, texid, win_w, win_h, detections, face_id);

                let time_invoke1_start = performance.now();
                portraits[face_id] = await invoke_face_portrait (feed_image);
                time_invoke1 += performance.now() - time_invoke1_start;
            }
            need_invoke_tflite = false;
        }

        /* --------------------------------------- *
         *  render scene
         * --------------------------------------- */
        GLUtil.set_render_target (gl, s_rtarget_main);
        gl.clear (gl.COLOR_BUFFER_BIT);

        r2d.draw_2d_texture (gl, texid, 0, 0, win_w, win_h, 0)

        for (let face_id = 0; face_id < detections.length; face_id ++)
        {
            render_portrait_face_image (gl, 0, 0, win_w, win_h, detections, face_id, portraits[face_id]);
        }

        if (s_gui_prop.draw_roi_rect)
        {
            render_detect_region (gl, 0, 0, win_w, win_h, detections);

            /* draw cropped image of the face area */
            for (let face_id = 0; face_id < detections.length; face_id ++)
            {
                let w = 100;
                let h = 100;
                let x = win_w - w - 10;
                let y = h * face_id + 20;
                let col_white = [1.0, 1.0, 1.0, 1.0];

                render_cropped_face_image (gl, texid, x, y, w, h, detections, face_id);
                r2d.draw_2d_rect (gl, x, y, w, h, col_white, 2.0);
            }
        }

        /* --------------------------------------- *
         *  post process
         * --------------------------------------- */
        if (s_gui_prop.draw_pmeter)
        {
            pmeter.draw_pmeter (gl, 0, 40);
        }

        let str = "Interval: " + interval_ms.toFixed(1) + " [ms]";
        dbgstr.draw_dbgstr (gl, str, 10, 10);

        str = "TF.js0  : " + time_invoke0.toFixed(1)  + " [ms]";
        dbgstr.draw_dbgstr (gl, str, 10, 10 + 22 * 1);
        str = "TF.js1  : " + time_invoke1.toFixed(1)  + " [ms]";
        dbgstr.draw_dbgstr (gl, str, 10, 10 + 22 * 2);

        if (req_prologue > 0)
        {
            req_prologue --;
            if (req_prologue == 0)
            {
                let x = win_w * 0.25;
                let y = win_h * 0.5 - 50;
                let w = win_w * 0.5;
                let h = 100;
                r2d.draw_2d_fillrect   (gl, x, y, w,  h, [0.0, 0.4, 0.4, 0.4]);
                r2d.draw_2d_rect       (gl, x, y, w,  h, [0.0, 1.0, 1.0, 0.8], 3.0);

                x = win_w * 0.5 - 100;
                y = win_h * 0.5 - 11;
                let str = "    please wait...    ";
                dbgstr.draw_dbgstr_ex (gl, str, x, y, 1, [0.0, 1.0, 1.0, 1.0], [0.0, 0.0, 0.0, 0.0]);

                need_invoke_tflite = true;
            }
        }

        stats.end();
        requestAnimationFrame (render);
    }
    render ();
}
