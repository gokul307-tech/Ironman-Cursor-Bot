import * as THREE from 'three';
import './style.css';

import { RoundedBoxGeometry } from
'three/examples/jsm/geometries/RoundedBoxGeometry.js';


// ============================================================
// SCENE
// ============================================================

const scene = new THREE.Scene();

scene.background =
    new THREE.Color(0x010207);


// ============================================================
// CAMERA
// ============================================================

const camera =
    new THREE.PerspectiveCamera(
        42,
        innerWidth / innerHeight,
        0.1,
        100
    );

camera.position.set(
    0,
    1.25,
    8
);


// ============================================================
// RENDERER
// ============================================================

const renderer =
    new THREE.WebGLRenderer({
        antialias: true,
        powerPreference: 'high-performance'
    });

renderer.setPixelRatio(
    Math.min(
        window.devicePixelRatio,
        1.35
    )
);

renderer.setSize(
    innerWidth,
    innerHeight
);

renderer.outputColorSpace =
    THREE.SRGBColorSpace;

renderer.toneMapping =
    THREE.ACESFilmicToneMapping;

renderer.toneMappingExposure =
    1.15;

document
    .querySelector('#app')
    .appendChild(renderer.domElement);


// ============================================================
// LIGHTING
// ============================================================

scene.add(
    new THREE.AmbientLight(
        0x6677aa,
        1.8
    )
);


const redLight =
    new THREE.PointLight(
        0xff1838,
        30,
        12
    );

redLight.position.set(
    3,
    2,
    2
);

scene.add(redLight);


const blueLight =
    new THREE.PointLight(
        0x208cff,
        45,
        14
    );

blueLight.position.set(
    -3,
    2,
    3
);

scene.add(blueLight);


const goldLight =
    new THREE.PointLight(
        0xffa52f,
        25,
        10
    );

goldLight.position.set(
    0,
    -1,
    3
);

scene.add(goldLight);


// ============================================================
// FLOOR
// ============================================================

const floor =
    new THREE.Mesh(
        new THREE.PlaneGeometry(
            24,
            24
        ),
        new THREE.MeshBasicMaterial({
            color: 0x08090e,
            transparent: true,
            opacity: 0.65
        })
    );

floor.rotation.x =
    -Math.PI / 2;

floor.position.y =
    -2.05;

scene.add(floor);


// ============================================================
// STAR FIELD
// ============================================================

const starGeometry =
    new THREE.BufferGeometry();

const STAR_COUNT = 900;

const starPositions =
    new Float32Array(
        STAR_COUNT * 3
    );

for (
    let i = 0;
    i < STAR_COUNT;
    i++
) {

    const i3 =
        i * 3;

    starPositions[i3] =
        (Math.random() - 0.5) * 20;

    starPositions[i3 + 1] =
        (Math.random() - 0.5) * 11;

    starPositions[i3 + 2] =
        -Math.random() * 15 - 2;
}

starGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(
        starPositions,
        3
    )
);

scene.add(
    new THREE.Points(
        starGeometry,
        new THREE.PointsMaterial({
            color: 0xb9c8ff,
            size: 0.018,
            transparent: true,
            opacity: 0.7
        })
    )
);


// ============================================================
// BLACK HOLE BACKGROUND
// ============================================================

const blackHole =
    new THREE.Group();


const blackCore =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            1.15,
            32,
            32
        ),
        new THREE.MeshBasicMaterial({
            color: 0x000000
        })
    );

blackHole.add(
    blackCore
);


const blackRing =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            1.5,
            0.065,
            12,
            80
        ),
        new THREE.MeshBasicMaterial({
            color: 0x6c20b8,
            transparent: true,
            opacity: 0.28
        })
    );

blackRing.rotation.x =
    0.3;

blackHole.add(
    blackRing
);

blackHole.position.set(
    0,
    1.2,
    -6
);

scene.add(
    blackHole
);


// ============================================================
// MATERIALS
// ============================================================

const armorRed =
    new THREE.MeshStandardMaterial({
        color: 0x8d1015,
        metalness: 0.8,
        roughness: 0.22
    });


const armorRedBright =
    new THREE.MeshStandardMaterial({
        color: 0xc91c25,
        metalness: 0.82,
        roughness: 0.18
    });


const armorDark =
    new THREE.MeshStandardMaterial({
        color: 0x35070a,
        metalness: 0.82,
        roughness: 0.25
    });


const gold =
    new THREE.MeshStandardMaterial({
        color: 0xd58a18,
        metalness: 0.82,
        roughness: 0.2
    });


const goldBright =
    new THREE.MeshStandardMaterial({
        color: 0xffbd3b,
        metalness: 0.75,
        roughness: 0.18
    });


const blackMetal =
    new THREE.MeshStandardMaterial({
        color: 0x080b12,
        metalness: 0.85,
        roughness: 0.2
    });


const reactorBlue =
    new THREE.MeshStandardMaterial({
        color: 0x8eeeff,
        emissive: 0x009dff,
        emissiveIntensity: 5,
        metalness: 0.2,
        roughness: 0.15
    });


const eyeWhite =
    new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x7ddcff,
        emissiveIntensity: 4,
        metalness: 0.1,
        roughness: 0.1
    });


// ============================================================
// HELPER
// ============================================================

function roundedBox(
    width,
    height,
    depth,
    radius,
    material
) {

    const geometry =
        new RoundedBoxGeometry(
            width,
            height,
            depth,
            5,
            radius
        );

    return new THREE.Mesh(
        geometry,
        material
    );
}


// ============================================================
// IRON-MAN STYLE SUIT
// ============================================================

const ironMan =
    new THREE.Group();

ironMan.position.set(
    0,
    -0.45,
    0
);

scene.add(
    ironMan
);


// ============================================================
// TORSO
// ============================================================

const torso =
    roundedBox(
        1.45,
        1.65,
        0.95,
        0.22,
        armorRed
    );

torso.position.y =
    -0.35;

ironMan.add(
    torso
);


// ============================================================
// CHEST ARMOR
// ============================================================

const chest =
    roundedBox(
        1.18,
        1.05,
        0.12,
        0.16,
        armorRedBright
    );

chest.position.set(
    0,
    -0.28,
    0.53
);

ironMan.add(
    chest
);


// ============================================================
// CHEST GOLD EDGES
// ============================================================

const chestLeft =
    roundedBox(
        0.15,
        0.9,
        0.08,
        0.05,
        gold
    );

const chestRight =
    roundedBox(
        0.15,
        0.9,
        0.08,
        0.05,
        gold
    );

chestLeft.position.set(
    -0.48,
    -0.28,
    0.62
);

chestRight.position.set(
    0.48,
    -0.28,
    0.62
);

ironMan.add(
    chestLeft,
    chestRight
);


// ============================================================
// ARC REACTOR ON CHEST
// ============================================================

const chestReactor =
    new THREE.Group();

chestReactor.position.set(
    0,
    -0.35,
    0.65
);

ironMan.add(
    chestReactor
);


const reactorOuter =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            0.25,
            0.055,
            10,
            32
        ),
        goldBright
    );

chestReactor.add(
    reactorOuter
);


const reactorInner =
    new THREE.Mesh(
        new THREE.CircleGeometry(
            0.19,
            24
        ),
        reactorBlue
    );

reactorInner.position.z =
    0.02;

chestReactor.add(
    reactorInner
);


// Reactor spokes

for (
    let i = 0;
    i < 8;
    i++
) {

    const spoke =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.035,
                0.18,
                0.035
            ),
            reactorBlue
        );

    spoke.rotation.z =
        (Math.PI * 2 * i) / 8;

    chestReactor.add(
        spoke
    );
}


// ============================================================
// WAIST
// ============================================================

const waist =
    roundedBox(
        1.0,
        0.3,
        0.7,
        0.1,
        armorDark
    );

waist.position.y =
    -1.2;

ironMan.add(
    waist
);


// ============================================================
// NECK
// ============================================================

const neck =
    roundedBox(
        0.48,
        0.25,
        0.45,
        0.08,
        blackMetal
    );

neck.position.y =
    0.58;

ironMan.add(
    neck
);


// ============================================================
// HEAD
// ============================================================

const head =
    new THREE.Group();

head.position.y =
    1.05;

ironMan.add(
    head
);


// Main helmet

const helmet =
    roundedBox(
        1.45,
        1.25,
        1.1,
        0.25,
        armorRedBright
    );

head.add(
    helmet
);


// ============================================================
// GOLD FACE PLATE
// ============================================================

const facePlate =
    roundedBox(
        1.13,
        0.82,
        0.12,
        0.12,
        goldBright
    );

facePlate.position.set(
    0,
    -0.02,
    0.58
);

head.add(
    facePlate
);


// ============================================================
// BLACK FACE OPENING
// ============================================================

const faceOpening =
    roundedBox(
        0.95,
        0.46,
        0.07,
        0.1,
        blackMetal
    );

faceOpening.position.set(
    0,
    0.04,
    0.65
);

head.add(
    faceOpening
);


// ============================================================
// EYES
// ============================================================

const leftEye =
    roundedBox(
        0.38,
        0.075,
        0.045,
        0.025,
        eyeWhite
    );

const rightEye =
    roundedBox(
        0.38,
        0.075,
        0.045,
        0.025,
        eyeWhite
    );

leftEye.position.set(
    -0.27,
    0.13,
    0.7
);

rightEye.position.set(
    0.27,
    0.13,
    0.7
);

leftEye.rotation.z =
    -0.12;

rightEye.rotation.z =
    0.12;

head.add(
    leftEye,
    rightEye
);


// ============================================================
// HELMET GOLD SIDES
// ============================================================

const leftHelmetSide =
    roundedBox(
        0.18,
        0.55,
        0.85,
        0.06,
        gold
    );

const rightHelmetSide =
    roundedBox(
        0.18,
        0.55,
        0.85,
        0.06,
        gold
    );

leftHelmetSide.position.x =
    -0.68;

rightHelmetSide.position.x =
    0.68;

head.add(
    leftHelmetSide,
    rightHelmetSide
);


// ============================================================
// SHOULDERS
// ============================================================

const leftShoulder =
    roundedBox(
        0.52,
        0.42,
        0.7,
        0.16,
        armorRedBright
    );

const rightShoulder =
    roundedBox(
        0.52,
        0.42,
        0.7,
        0.16,
        armorRedBright
    );

leftShoulder.position.set(
    -0.9,
    0.05,
    0
);

rightShoulder.position.set(
    0.9,
    0.05,
    0
);

ironMan.add(
    leftShoulder,
    rightShoulder
);


// ============================================================
// ARMS
// ============================================================

const leftArm =
    new THREE.Group();

const rightArm =
    new THREE.Group();

leftArm.position.set(
    -0.9,
    -0.2,
    0
);

rightArm.position.set(
    0.9,
    -0.2,
    0
);

ironMan.add(
    leftArm,
    rightArm
);


// Upper arms

const upperLeft =
    roundedBox(
        0.4,
        0.7,
        0.42,
        0.15,
        armorRed
    );

const upperRight =
    roundedBox(
        0.4,
        0.7,
        0.42,
        0.15,
        armorRed
    );

upperLeft.position.y =
    -0.35;

upperRight.position.y =
    -0.35;

leftArm.add(
    upperLeft
);

rightArm.add(
    upperRight
);


// Elbows

const elbowLeft =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.16,
            12,
            12
        ),
        gold
    );

const elbowRight =
    new THREE.Mesh(
        new THREE.SphereGeometry(
            0.16,
            12,
            12
        ),
        gold
    );

elbowLeft.position.y =
    -0.78;

elbowRight.position.y =
    -0.78;

leftArm.add(
    elbowLeft
);

rightArm.add(
    elbowRight
);


// Forearms

const foreLeft =
    roundedBox(
        0.38,
        0.65,
        0.45,
        0.14,
        armorRedBright
    );

const foreRight =
    roundedBox(
        0.38,
        0.65,
        0.45,
        0.14,
        armorRedBright
    );

foreLeft.position.y =
    -1.08;

foreRight.position.y =
    -1.08;

leftArm.add(
    foreLeft
);

rightArm.add(
    foreRight
);


// Gold gauntlets

const gauntletLeft =
    roundedBox(
        0.42,
        0.35,
        0.48,
        0.12,
        gold
    );

const gauntletRight =
    roundedBox(
        0.42,
        0.35,
        0.48,
        0.12,
        gold
    );

gauntletLeft.position.y =
    -1.52;

gauntletRight.position.y =
    -1.52;

leftArm.add(
    gauntletLeft
);

rightArm.add(
    gauntletRight
);


// ============================================================
// PALM ARC REACTORS
// ============================================================

function createPalmReactor() {

    const reactor =
        new THREE.Mesh(
            new THREE.CircleGeometry(
                0.1,
                16
            ),
            reactorBlue
        );

    reactor.position.z =
        0.25;

    return reactor;
}


leftArm.add(
    createPalmReactor()
);

rightArm.add(
    createPalmReactor()
);


// ============================================================
// LEGS
// ============================================================

const leftLeg =
    new THREE.Group();

const rightLeg =
    new THREE.Group();

leftLeg.position.set(
    -0.33,
    -1.38,
    0
);

rightLeg.position.set(
    0.33,
    -1.38,
    0
);

ironMan.add(
    leftLeg,
    rightLeg
);


// Thighs

const thighLeft =
    roundedBox(
        0.48,
        0.62,
        0.48,
        0.16,
        armorRed
    );

const thighRight =
    roundedBox(
        0.48,
        0.62,
        0.48,
        0.16,
        armorRed
    );

thighLeft.position.y =
    -0.25;

thighRight.position.y =
    -0.25;

leftLeg.add(
    thighLeft
);

rightLeg.add(
    thighRight
);


// Knees

const kneeLeft =
    roundedBox(
        0.4,
        0.25,
        0.45,
        0.09,
        gold
    );

const kneeRight =
    roundedBox(
        0.4,
        0.25,
        0.45,
        0.09,
        gold
    );

kneeLeft.position.y =
    -0.62;

kneeRight.position.y =
    -0.62;

leftLeg.add(
    kneeLeft
);

rightLeg.add(
    kneeRight
);


// Lower legs

const shinLeft =
    roundedBox(
        0.42,
        0.65,
        0.45,
        0.14,
        armorRedBright
    );

const shinRight =
    roundedBox(
        0.42,
        0.65,
        0.45,
        0.14,
        armorRedBright
    );

shinLeft.position.y =
    -0.98;

shinRight.position.y =
    -0.98;

leftLeg.add(
    shinLeft
);

rightLeg.add(
    shinRight
);


// ============================================================
// BOOTS
// ============================================================

const bootLeft =
    roundedBox(
        0.55,
        0.35,
        0.75,
        0.12,
        armorDark
    );

const bootRight =
    roundedBox(
        0.55,
        0.35,
        0.75,
        0.12,
        armorDark
    );

bootLeft.position.set(
    0,
    -1.42,
    0.12
);

bootRight.position.set(
    0,
    -1.42,
    0.12
);

leftLeg.add(
    bootLeft
);

rightLeg.add(
    bootRight
);


// ============================================================
// THRUSTERS
// ============================================================

const thrusterMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x45cfff,
        transparent: true,
        opacity: 0.8
    });


function createThruster(
    parent,
    x,
    y,
    z
) {

    const thruster =
        new THREE.Mesh(
            new THREE.ConeGeometry(
                0.12,
                0.45,
                10
            ),
            thrusterMaterial
        );

    thruster.rotation.x =
        Math.PI;

    thruster.position.set(
        x,
        y,
        z
    );

    parent.add(
        thruster
    );

    return thruster;
}


const leftThruster =
    createThruster(
        leftLeg,
        0,
        -1.58,
        0
    );


const rightThruster =
    createThruster(
        rightLeg,
        0,
        -1.58,
        0
    );


// ============================================================
// ARC REACTOR CURSOR
// ============================================================

const cursorReactor =
    new THREE.Group();

scene.add(
    cursorReactor
);


// Outer energy ring

const cursorOuter =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            0.34,
            0.045,
            12,
            48
        ),
        new THREE.MeshBasicMaterial({
            color: 0xffb52e
        })
    );

cursorReactor.add(
    cursorOuter
);


// Blue ring

const cursorBlueRing =
    new THREE.Mesh(
        new THREE.TorusGeometry(
            0.25,
            0.035,
            10,
            40
        ),
        new THREE.MeshBasicMaterial({
            color: 0x35d8ff
        })
    );

cursorReactor.add(
    cursorBlueRing
);


// Inner energy core

const cursorCore =
    new THREE.Mesh(
        new THREE.CircleGeometry(
            0.19,
            24
        ),
        new THREE.MeshBasicMaterial({
            color: 0x9ff5ff
        })
    );

cursorReactor.add(
    cursorCore
);


// Energy spokes

for (
    let i = 0;
    i < 10;
    i++
) {

    const spoke =
        new THREE.Mesh(
            new THREE.BoxGeometry(
                0.025,
                0.28,
                0.025
            ),
            new THREE.MeshBasicMaterial({
                color: 0x5be5ff
            })
        );

    spoke.rotation.z =
        (Math.PI * 2 * i) / 10;

    cursorReactor.add(
        spoke
    );
}


// Outer energy particles

const cursorParticles =
    new THREE.Group();

cursorReactor.add(
    cursorParticles
);

for (
    let i = 0;
    i < 12;
    i++
) {

    const particle =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.025,
                6,
                6
            ),
            new THREE.MeshBasicMaterial({
                color: 0x62eaff
            })
        );

    const angle =
        (Math.PI * 2 * i) / 12;

    particle.position.set(
        Math.cos(angle) * 0.48,
        Math.sin(angle) * 0.48,
        0
    );

    cursorParticles.add(
        particle
    );
}


// ============================================================
// MOUSE TARGET
// ============================================================

const pointer =
    new THREE.Vector2();

const target =
    new THREE.Vector3();


function updateTarget() {

    target.x =
        pointer.x * 4.4;

    target.z =
        pointer.y * 2.7 - 0.4;

    target.z =
        THREE.MathUtils.clamp(
            target.z,
            -4,
            2.2
        );

    target.y =
        -0.45;
}


window.addEventListener(
    'pointermove',
    event => {

        pointer.x =
            event.clientX /
            innerWidth *
            2 -
            1;

        pointer.y =
            -(
                event.clientY /
                innerHeight
            ) *
            2 +
            1;

        updateTarget();
    }
);


// ============================================================
// WELDING PARTICLE SYSTEM
// ============================================================

const weldingParticles = [];

const weldingColors = [
    0xffffff,
    0x8feaff,
    0x4ccfff,
    0xffd34e,
    0xff8a22
];


const weldingGeometry =
    new THREE.SphereGeometry(
        0.025,
        6,
        6
    );


// ============================================================
// WELDING EFFECT
// ============================================================

function createWeldingEffect(
    position
) {

    // --------------------------------------------------------
    // MAIN WELDING FLASH
    // --------------------------------------------------------

    const flash =
        new THREE.Mesh(
            new THREE.SphereGeometry(
                0.18,
                16,
                16
            ),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 1
            })
        );

    flash.position.copy(
        position
    );

    scene.add(
        flash
    );


    // --------------------------------------------------------
    // SPARKS
    // --------------------------------------------------------

    const sparkCount = 55;

    for (
        let i = 0;
        i < sparkCount;
        i++
    ) {

        const material =
            new THREE.MeshBasicMaterial({
                color:
                    weldingColors[
                        Math.floor(
                            Math.random() *
                            weldingColors.length
                        )
                    ],
                transparent: true,
                opacity: 1
            });


        const spark =
            new THREE.Mesh(
                weldingGeometry,
                material
            );


        spark.position.copy(
            position
        );


        const direction =
            new THREE.Vector3(
                Math.random() * 2 - 1,
                Math.random() * 2 - 1,
                Math.random() * 2 - 1
            ).normalize();


        const speed =
            THREE.MathUtils.randFloat(
                1.2,
                4.8
            );


        spark.userData.velocity =
            direction.multiplyScalar(
                speed
            );


        spark.userData.life =
            THREE.MathUtils.randFloat(
                0.35,
                0.9
            );


        spark.userData.maxLife =
            spark.userData.life;


        scene.add(
            spark
        );

        weldingParticles.push(
            spark
        );
    }


    // --------------------------------------------------------
    // WELDING FLASH LIGHT
    // --------------------------------------------------------

    const weldLight =
        new THREE.PointLight(
            0x8edfff,
            18,
            3
        );

    weldLight.position.copy(
        position
    );

    scene.add(
        weldLight
    );


    // Store temporary effects

    weldingParticles.push({
        flash,
        weldLight,
        effect: true,
        life: 0.25,
        maxLife: 0.25
    });
}


// ============================================================
// CLICK = WELDING
// ============================================================

window.addEventListener(
    'pointerdown',
    () => {

        createWeldingEffect(
            target.clone()
        );
    }
);


// ============================================================
// MOTION TRAIL
// ============================================================

const trailParticles = [];

const trailGeometry =
    new THREE.SphereGeometry(
        0.07,
        6,
        6
    );


const trailMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x37bfff,
        transparent: true,
        opacity: 0.3
    });


function createTrail() {

    if (
        trailParticles.length >
        24
    ) {
        return;
    }


    const p =
        new THREE.Mesh(
            trailGeometry,
            trailMaterial.clone()
        );


    p.position.copy(
        ironMan.position
    );


    p.position.y -=
        0.8;


    p.userData.life =
        0.4;


    scene.add(
        p
    );

    trailParticles.push(
        p
    );
}


// ============================================================
// CLOCK
// ============================================================

const clock =
    new THREE.Clock();

let trailTimer = 0;


// ============================================================
// ANIMATION
// ============================================================

function animate() {

    requestAnimationFrame(
        animate
    );


    const dt =
        Math.min(
            clock.getDelta(),
            0.033
        );


    const time =
        clock.elapsedTime;


    // ========================================================
    // DISTANCE TO ARC REACTOR
    // ========================================================

    const dx =
        target.x -
        ironMan.position.x;

    const dz =
        target.z -
        ironMan.position.z;


    const distance =
        Math.sqrt(
            dx * dx +
            dz * dz
        );


    // ========================================================
    // SLOW IRON MAN MOVEMENT
    // ========================================================

    if (
        distance > 0.08
    ) {

        const dirX =
            dx /
            distance;

        const dirZ =
            dz /
            distance;


        // Slow deliberate approach

        const speed =
            THREE.MathUtils.clamp(
                1.0 +
                distance * 0.35,
                1.0,
                2.6
            );


        const movement =
            Math.min(
                speed * dt,
                distance
            );


        ironMan.position.x +=
            dirX *
            movement;


        ironMan.position.z +=
            dirZ *
            movement;


        // Face cursor

        const desiredRotation =
            Math.atan2(
                dirX,
                dirZ
            );


        ironMan.rotation.y =
            THREE.MathUtils.damp(
                ironMan.rotation.y,
                desiredRotation,
                5,
                dt
            );


        // ====================================================
        // WALK / RUN ANIMATION
        // ====================================================

        const walk =
            Math.sin(
                time * 8
            );


        const opposite =
            Math.sin(
                time * 8 +
                Math.PI
            );


        ironMan.position.y =
            -0.45 +
            Math.abs(walk) *
            0.035;


        leftArm.rotation.z =
            walk * 0.25;


        rightArm.rotation.z =
            opposite * 0.25;


        leftLeg.rotation.x =
            opposite * 0.3;


        rightLeg.rotation.x =
            walk * 0.3;


        // Thruster flicker

        const thrust =
            0.75 +
            Math.abs(
                Math.sin(
                    time * 15
                )
            ) * 0.4;


        leftThruster.scale.y =
            thrust;


        rightThruster.scale.y =
            thrust;


        // Trail

        trailTimer += dt;

        if (
            trailTimer >
            0.07
        ) {

            createTrail();

            trailTimer = 0;
        }

    } else {

        // ====================================================
        // IDLE
        // ====================================================

        ironMan.position.y =
            THREE.MathUtils.damp(
                ironMan.position.y,
                -0.45,
                5,
                dt
            );


        leftArm.rotation.z =
            THREE.MathUtils.damp(
                leftArm.rotation.z,
                0,
                5,
                dt
            );


        rightArm.rotation.z =
            THREE.MathUtils.damp(
                rightArm.rotation.z,
                0,
                5,
                dt
            );


        leftLeg.rotation.x =
            THREE.MathUtils.damp(
                leftLeg.rotation.x,
                0,
                5,
                dt
            );


        rightLeg.rotation.x =
            THREE.MathUtils.damp(
                rightLeg.rotation.x,
                0,
                5,
                dt
            );
    }


    // ========================================================
    // CURSOR ARC REACTOR
    // ========================================================

    cursorReactor.position.lerp(
        target,
        1 -
        Math.exp(
            -18 * dt
        )
    );


    cursorOuter.rotation.z +=
        dt * 1.8;


    cursorBlueRing.rotation.z -=
        dt * 2.4;


    cursorParticles.rotation.z +=
        dt * 1.5;


    const reactorPulse =
        1 +
        Math.sin(
            time * 7
        ) *
        0.08;


    cursorCore.scale.setScalar(
        reactorPulse
    );


    // ========================================================
    // CHEST ARC REACTOR
    // ========================================================

    chestReactor.rotation.z +=
        dt * 0.8;


    chestReactor.scale.setScalar(
        1 +
        Math.sin(
            time * 6
        ) *
        0.04
    );


    // ========================================================
    // WELDING PARTICLES
    // ========================================================

    for (
        let i =
            weldingParticles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            weldingParticles[i];


        // Temporary flash object

        if (
            p.effect
        ) {

            p.life -=
                dt;


            p.flash.scale.multiplyScalar(
                1 +
                dt * 10
            );


            p.flash.material.opacity =
                Math.max(
                    0,
                    p.life /
                    p.maxLife
                );


            p.weldLight.intensity =
                18 *
                Math.max(
                    0,
                    p.life /
                    p.maxLife
                );


            if (
                p.life <= 0
            ) {

                scene.remove(
                    p.flash
                );

                scene.remove(
                    p.weldLight
                );


                p.flash.geometry.dispose();

                p.flash.material.dispose();

                scene.remove;

                weldingParticles.splice(
                    i,
                    1
                );
            }

            continue;
        }


        // Spark

        p.userData.life -=
            dt;


        p.userData.velocity.y -=
            4.2 *
            dt;


        p.position.addScaledVector(
            p.userData.velocity,
            dt
        );


        p.material.opacity =
            Math.max(
                0,
                p.userData.life /
                p.userData.maxLife
            );


        if (
            p.userData.life <= 0
        ) {

            scene.remove(
                p
            );

            p.material.dispose();

            weldingParticles.splice(
                i,
                1
            );
        }
    }


    // ========================================================
    // MOVEMENT TRAIL
    // ========================================================

    for (
        let i =
            trailParticles.length - 1;
        i >= 0;
        i--
    ) {

        const p =
            trailParticles[i];


        p.userData.life -=
            dt;


        p.position.y +=
            dt * 0.3;


        p.scale.multiplyScalar(
            0.97
        );


        p.material.opacity =
            p.userData.life *
            0.45;


        if (
            p.userData.life <= 0
        ) {

            scene.remove(
                p
            );

            trailParticles.splice(
                i,
                1
            );
        }
    }


    // ========================================================
    // BACKGROUND
    // ========================================================

    blackRing.rotation.z +=
        dt * 0.12;

    blackHole.rotation.y +=
        dt * 0.02;


    // ========================================================
    // CAMERA
    // ========================================================

    camera.position.x =
        THREE.MathUtils.damp(
            camera.position.x,
            pointer.x * 0.12,
            2,
            dt
        );


    camera.position.y =
        THREE.MathUtils.damp(
            camera.position.y,
            1.25 +
            pointer.y * 0.08,
            2,
            dt
        );


    camera.lookAt(
        0,
        0.05,
        -1.5
    );


    // ========================================================
    // RENDER
    // ========================================================

    renderer.render(
        scene,
        camera
    );
}


// ============================================================
// START
// ============================================================

pointer.set(
    0,
    0
);

updateTarget();

animate();


// ============================================================
// RESIZE
// ============================================================

window.addEventListener(
    'resize',
    () => {

        camera.aspect =
            innerWidth /
            innerHeight;

        camera.updateProjectionMatrix();

        renderer.setPixelRatio(
            Math.min(
                window.devicePixelRatio,
                1.35
            )
        );

        renderer.setSize(
            innerWidth,
            innerHeight
        );
    }
);