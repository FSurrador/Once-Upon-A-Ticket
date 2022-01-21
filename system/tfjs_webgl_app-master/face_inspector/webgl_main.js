/* ------------------------------------------------ *
 * The MIT License (MIT)
 * Copyright (c) 2020 terryky1220@gmail.com
 * ------------------------------------------------ */
//tf.setBackend('wasm').then(() => startWebGL());

let s_debug_log;
let s_rtarget_main;
let s_rtarget_feed;
let s_rtarget_src;
let s_is_dragover = false;
let s_drop_files = [];

class GuiProperty {
    constructor() {
        this.detect_thresh     =  0.7;
        this.detect_nms_enable = true;
        this.detect_iou_thresh =  0.3;
        this.flip_horizontal   = true;
        this.draw_roi_rect     = false;
        this.draw_pmeter       = false;
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
generate_face_inspector_input_image (gl, texid, win_w, win_h, detection, face_id)
{
    let dims = get_face_inspector_input_dims ();
    let buf_rgba = new Uint8Array (dims.w * dims.h * 4);
    let buf_rgb  = new Uint8Array (dims.w * dims.h * 3);

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
            buf_rgb[j++] = buf_rgba[i];
    }

    GLUtil.set_render_target (gl, s_rtarget_main);

    return buf_rgb;
}


function
render_detect_region (gl, ofstx, ofsty, texw, texh, detection, ages)
{
    let col_white = [1.0, 1.0, 1.0, 1.0];
    let col_red   = [1.0, 0.0, 0.0, 1.0];
    let col_blue  = [0.0, 0.0, 1.0, 1.0];
    let col_frame;

    for (let i = 0; i < detection.length; i ++)
    {
        region = detection[i];
        let x1 = region.topleft.x  * texw + ofstx;
        let y1 = region.topleft.y  * texh + ofsty;
        let x2 = region.btmright.x * texw + ofstx;
        let y2 = region.btmright.y * texh + ofsty;
        let score = region.score;
        let buf;

        /* gender */
        if (ages[i].gender)
        {
            buf = "M:";
            col_frame = col_blue;
        }
        else
        {
            buf = "F:";
            col_frame = col_red;
        }

        /* rectangle region */
        r2d.draw_2d_rect (gl, x1, y1, x2-x1, y2-y1, col_frame, 2.0);

        /* age */
        let age = ages[i].age;

        buf += (age + 0.5).toFixed(0) + "yrs";
        dbgstr.draw_dbgstr_ex (gl, buf, x1, y1-(22*1.0), 1.0, col_white, col_frame);

        if (s_gui_prop.draw_roi_rect)
        {
            /* score */
            let buf = "" + (score * 100).toFixed(0);
            dbgstr.draw_dbgstr_ex (gl, buf, x1, y1, 1.0, col_white, col_frame);

            /* key points */
            for (let j0 = 0; j0 < kFaceKeyNum; j0 ++)
            {
                let x = region.keys[j0].x * texw + ofstx;
                let y = region.keys[j0].y * texh + ofsty;

                r = 4;
                r2d.draw_2d_fillrect (gl, x - (r/2), y - (r/2), r, r, col_frame);
            }

            /* ROI region */
            for (let j0 = 0; j0 < 4; j0 ++)
            {
                let j1 = (j0 + 1) % 4;
                let x1 = region.roi_coord[j0].x * texw + ofstx;
                let y1 = region.roi_coord[j0].y * texh + ofsty;
                let x2 = region.roi_coord[j1].x * texw + ofstx;
                let y2 = region.roi_coord[j1].y * texh + ofsty;

                r2d.draw_2d_line (gl, x1, y1, x2, y2, col_frame, 2.0);
            }
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

    gui.add (s_gui_prop, 'detect_thresh', 0.0, 1.0);
    gui.add (s_gui_prop, 'detect_nms_enable');
    gui.add (s_gui_prop, 'detect_iou_thresh', 0.0, 1.0);
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

    init_gui ();

    const camtex = GLUtil.create_camera_texture (gl);
    //const camtex = GLUtil.create_video_texture (gl, "assets/pexels_video.mp4");
    let imgtex = GLUtil.create_image_texture2 (gl, "pakutaso.jpg");

    let win_w = canvas.clientWidth;
    let win_h = canvas.clientHeight;

    r2d.init_2d_render (gl, win_w, win_h);
    init_dbgstr (gl, win_w, win_h);
    pmeter.init_pmeter (gl, win_w, win_h, win_h - 40);
    const stats = init_stats ();


    await init_tfjs_face_inspector ();
    s_debug_log.innerHTML = "tfjs.Backend = " + tf.getBackend() + "<br>"

    s_rtarget_main = GLUtil.create_render_target (gl, win_w, win_h, 0);
    s_rtarget_feed = GLUtil.create_render_target (gl, win_w, win_w, 1);
    s_rtarget_src  = GLUtil.create_render_target (gl, win_w, win_w, 1);

    /* stop loading spinner */
    const spinner = document.getElementById('loading');
    spinner.classList.add('loaded');

    let prev_time_ms = performance.now();
    async function render (now)
    {
        pmeter.reset_lap (0);
        pmeter.set_lap (0);

        let cur_time_ms = performance.now();
        let interval_ms = cur_time_ms - prev_time_ms;
        prev_time_ms = cur_time_ms;

        stats.begin();

        if (s_drop_files.length > 0)
        {
            imgtex = GLUtil.create_image_texture_from_file (gl, s_drop_files[0]);
            s_drop_files = [];
        }

        let src_w = imgtex.image.width;
        let src_h = imgtex.image.height;
        let texid = imgtex.texid;
        if (GLUtil.is_camera_ready(camtex))
        {
            GLUtil.update_camera_texture (gl, camtex);
            src_w = camtex.video.videoWidth;
            src_h = camtex.video.videoHeight;
            texid = camtex.texid;
        }

        generate_squared_src_image (gl, texid, src_w, src_h, win_w, win_h);
        texid = s_rtarget_src.texid;

        /* --------------------------------------- *
         *  invoke TF.js (Face detection)
         * --------------------------------------- */
        let feed_image = generate_detect_input_image (gl, texid, win_w, win_h);

        let time_invoke0_start = performance.now();
        let detections = await invoke_pose_detect (feed_image, s_gui_prop);
        let time_invoke0 = performance.now() - time_invoke0_start;

        /* --------------------------------------- *
         *  invoke TF.js (Face age estimation)
         * --------------------------------------- */
        let ages = [];
        let time_invoke1 = 0;
        for (let face_id = 0; face_id < detections.length; face_id ++)
        {
            let feed_image = generate_face_inspector_input_image (gl, texid, win_w, win_h, detections, face_id);

            let time_invoke1_start = performance.now();
            ages[face_id] = await invoke_face_inspector (feed_image, s_gui_prop);
            time_invoke1 += performance.now() - time_invoke1_start;
        }

        /* --------------------------------------- *
         *  render scene
         * --------------------------------------- */
        GLUtil.set_render_target (gl, s_rtarget_main);
        gl.clear (gl.COLOR_BUFFER_BIT);

        r2d.draw_2d_texture (gl, texid, 0, 0, win_w, win_h, 0)

        render_detect_region (gl, 0, 0, win_w, win_h, detections, ages);

        if (s_gui_prop.draw_roi_rect)
        {
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

        stats.end();
        requestAnimationFrame (render);
    }
    render ();
}
